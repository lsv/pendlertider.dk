import {Journey, JourneyDate, JourneyMessage, JourneyStop} from "~/types";
import {intsToCoordinate} from "~/helpers";
import DateFormatter from "~/converters/DateFormatter";

export default function (json: any): Journey {

  const messages: Array<JourneyMessage> = []

  if (! Array.isArray(json.JourneyDetail.MessageList.Message)) {
    json.JourneyDetail.MessageList.Message = [json.JourneyDetail.MessageList.Message]
  }

  json.JourneyDetail.MessageList.Message.forEach((message: any) => {
    messages.push({
      header: message.Header.$,
      text: message.Text.$,
    })
  })

  function createTime(date: string, time: string, rtDate: string | undefined, rtTime: string | undefined): JourneyDate {
    const datetime = DateFormatter.fromRejseplanen(date, time)
    let changed = false
    let changedDate = date
    let changedTime = time
    if (rtDate) {
      changedDate = rtDate
    }

    if (rtTime) {
      changedTime = rtTime
    }

    const rtDatetime = DateFormatter.fromRejseplanen(changedDate, changedTime)
    if (+datetime !== +rtDatetime) {
      changed = true
    }

    return {
      date,
      time,
      datetime,
      rtDate,
      rtTime,
      rtDatetime,
      changed,
    }
  }

  function stops(elements: any): JourneyStop[] {
    const output: Array<JourneyStop> = []
    elements.forEach((elm: any) => {
      let departure = undefined
      if (elm.depDate || elm.depTime || elm.rtDepTime || elm.rtDepDate) {
        departure = createTime(elm?.depDate, elm?.depTime, elm?.rtDepDate, elm?.rtDepTime)
      }

      let arrival = undefined
      if (elm.arrDate || elm.arrTime || elm.rtArrTime || elm.rtArrDate) {
        arrival = createTime(elm?.arrDate, elm?.arrTime, elm?.rtArrDate, elm?.rtArrTime)
      }

      output.push({
        arrival: arrival,
        coordinate: intsToCoordinate(elm.x, elm.y),
        departure: departure,
        name: elm.name,
        note: null, // @todo
        routeIdx: parseInt(elm.routeIdx)
      })
    })

    return output
  }

  return {
    stops: stops(json.JourneyDetail.Stop),
    messages: messages,
  }
}
