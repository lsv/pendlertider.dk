import { Journey, JourneyMessage } from "~/types";

export default function (json: any): Journey {

  const messages: Array<JourneyMessage> = []
  json.MessageList.forEach((message: any) => {
    messages.push({
      header: message.Message.Header.$,
      text: message.Message.Text.$,
    })
  })

  return {
    stops: json.JourneyDetail.Stop,
    messages: messages,
  }
}
