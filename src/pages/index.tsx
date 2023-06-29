import dayjs from "dayjs"
import { useState } from "react"

const currentTime = dayjs()

export default function Home() {
  const [year, setYear] = useState<string>("")
  const [month, setMonth] = useState<string>("")
  const [date, setDate] = useState<string>("")

  const [validYear, setValidYear] = useState<boolean>(true)
  const [validMonth, setValidMonth] = useState<boolean>(true)
  const [validDate, setValidDate] = useState<boolean>(true)

  const valid = dayjs(
    `${year}-${leftPad(month)}-${leftPad(date)}`,
    "YYYY-MM-DD",
    true
  ).isValid()

  let diffYear: number | string = "--"
  let diffMonth: number | string = "--"
  let diffDay: number | string = "--"
  if (valid && year && month && date) {
    const birthday = dayjs(`${year}-${month}-${date}`)
    const diff = currentTime.diff(birthday, "d")
    diffYear = Math.floor(diff / 365)
    diffMonth = leftPad(Math.floor((diff % 365) / 30))
    diffDay = leftPad(diff % 30)
  }

  const handleYearInput = (input: string): void => {
    const value = +input
    if (input === null) return
    if (1900 <= value && value <= 2023) setValidYear(true)
    else setValidYear(false)
    setYear(input)
  }

  const handleMonthInput = (input: string): void => {
    const value = +input
    if (input === null) return
    if (1 <= value && value <= 12) setValidMonth(true)
    else setValidMonth(false)
    setMonth(input)
  }

  const handleDateInput = (input: string): void => {
    const value = +input
    if (input === null) return
    if (1 <= value && value <= 31) setValidDate(true)
    else setValidDate(false)
    setDate(input)
  }

  return (
    <section className="flex h-[100svh] w-[95%] flex-col items-center justify-center p-4">
      <h1 className="font-poppins-800  text-right text-4xl italic">AGEMETER</h1>
      <div className=" flex h-96 flex-col  space-y-2 rounded-3xl rounded-br-[25%] bg-slate-100 p-4 shadow-md">
        {/* input */}
        <div className="font-poppins-700 flex h-20 items-center justify-center space-x-6 text-black">
          <div className="flex w-24 flex-col space-y-[4px]">
            <label className="text-xs opacity-50">YEAR</label>
            <input
              className={`h-[60%] rounded-md border-[1px]  bg-slate-100 p-2 text-xl outline-none hover:border-purple-600 focus:border-purple-600 ${
                validYear ? "border-slate-400" : "border-red-600"
              }`}
              placeholder="YYYY"
              type="number"
              onChange={(event) => handleYearInput(event.target.value)}
              value={year || "--"}
              min={1900}
              max={2023}
              step={1}
            />
          </div>
          <div className="flex w-24 flex-col space-y-[4px]">
            <label className="text-xs opacity-50 ">MONTH</label>
            <input
              className={`h-[60%] rounded-md border-[1px]  bg-slate-100 p-2 text-xl outline-none hover:border-purple-600 focus:border-purple-600 ${
                validMonth ? "border-slate-400" : "border-red-600"
              }`}
              placeholder="MM"
              type="number"
              onChange={(event) => handleMonthInput(event.target.value)}
              value={month || "--"}
              min={1}
              max={12}
              step={1}
            />
          </div>
          <div className="flex w-24 flex-col space-y-[4px]">
            <label className="text-xs opacity-50">DAY</label>
            <input
              className={`h-[60%] rounded-md border-[1px]  bg-slate-100 p-2 text-xl outline-none hover:border-purple-600 focus:border-purple-600 ${
                validDate ? "border-slate-400" : "border-red-600"
              }`}
              placeholder="DD"
              type="number"
              onChange={(event) => handleDateInput(event.target.value)}
              value={date || "--"}
              min={1}
              max={31}
              step={1}
            />
          </div>
        </div>
        <div className="mx-auto w-[90%] border-[1px]  opacity-70" />
        {/* display */}
        <div className="font-poppins-800 flex h-[270px] flex-col justify-evenly italic">
          <p className="font text-6xl">
            <span className="text-purple-600">{diffYear}</span>{" "}
            <span className="text-5xl">years</span>
          </p>
          <p className="text-6xl">
            <span className="text-purple-600">{diffMonth}</span>{" "}
            <span className="text-5xl">months</span>
          </p>
          <p className="text-6xl">
            <span className="text-purple-600">{diffDay}</span>{" "}
            <span className="text-5xl">days</span>
          </p>
        </div>
      </div>
    </section>
  )
}

function leftPad(input: string | number | null): string {
  if (!input) return ""
  let str = input.toString()
  if (str.length > 2) str = str.substring(1, str.length)

  return str.padStart(2, "0")
}
