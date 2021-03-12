import { DateTime } from 'luxon'
import DateFormatter from '~/converters/DateFormatter'

const datetime = DateTime.fromObject({
  year: 2021,
  month: 3,
  day: 15,
  hour: 12,
  minute: 55,
})
const time = '12:55'
const date = '15.03.21'

describe('converters/DateFormatter', () => {
  it('can convert from rejseplanen format', () => {
    const res = DateFormatter.fromRejseplanen(date, time)
    expect(res.toFormat('yy-MM-dd HH:mm')).toBe('21-03-15 12:55')
  })

  it('can convert to rejseplanen format', () => {
    const res = DateFormatter.toRejseplanen(datetime)
    expect(res).toBe('15.03.21 12:55')
  })

  it('can convert time to rejseplanen format', () => {
    const res = DateFormatter.toRejseplanenTime(datetime)
    expect(res).toBe('12:55')
  })

  it('can convert date to rejseplanen format', () => {
    const res = DateFormatter.toRejseplanenDate(datetime)
    expect(res).toBe('15.03.21')
  })
})
