"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown } from 'lucide-react'

export default function EventDialog() {
  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState("16:00")
  const [endTime, setEndTime] = useState("17:00")
  const [repeat, setRepeat] = useState("never")
  const [invites, setInvites] = useState("none")
  const [url, setUrl] = useState("")
  const [notes, setNotes] = useState("")

  const formatDate = (date: Date | undefined) => {
    if (!date) return ""
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">REMINDER</Button>
      </DialogTrigger>
      <DialogContent className="p-0 overflow-hidden max-w-[350px] rounded-2xl bg-[#001F54]">
        <div className="flex items-center justify-between p-4 border-b border-[#002A6E]">
          <Button 
            variant="ghost" 
            className="text-yellow-600 font-semibold text-sm"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <span className="text-white font-semibold">New</span>
          <Button 
            variant="ghost" 
            className="text-yellow-600 font-semibold text-sm"
            onClick={() => setOpen(false)}
          >
            Save
          </Button>
        </div>
        <div className="p-4 space-y-4">
          <div className="bg-white text-black h-12 rounded-xl text-center border border-gray-300 flex items-center justify-center text-sm font-medium">Reminder</div>
          <Input 
            placeholder="Title" 
            className="bg-white border border-gray-300 placeholder:text-gray-500 text-black h-12 rounded-xl"
          />
          
          <div className="flex items-center justify-between bg-white rounded-md border border-gray-300 px-4 py-2">
            <span className="text-black font-bold">All-Day</span>
            <Switch />
          </div>

          <div className="space-y-3 rounded-md bg-white border border-gray-300 px-4 py-4">
            <div className="grid grid-cols-[auto,1fr] gap-4 items-center">
              <Label className="text-black">Starts</Label>
              <div className="flex justify-between w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="text-black hover:bg-gray-100 w-full justify-between">
                      {formatDate(startDate)}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Select onValueChange={setStartTime} defaultValue={startTime}>
                  <SelectTrigger className="w-[100px] border-0 focus:ring-0 text-black bg-transparent">
                    <SelectValue placeholder="Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                        {`${hour.toString().padStart(2, '0')}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-[auto,1fr] gap-4 items-center mt-4">
              <Label className="text-black">Ends</Label>
              <div className="flex justify-between w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="text-black bg-white w-full justify-between">
                      {formatDate(endDate)}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Select onValueChange={setEndTime} defaultValue={endTime}>
                  <SelectTrigger className="w-[100px] border-0 focus:ring-0 text-black bg-transparent">
                    <SelectValue placeholder="Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                        {`${hour.toString().padStart(2, '0')}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Select onValueChange={setRepeat} defaultValue={repeat}>
              <SelectTrigger className="w-full bg-white border border-gray-300 text-black">
                <span>Repeat</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setInvites} defaultValue={invites}>
              <SelectTrigger className="w-full bg-white border border-gray-300 text-black">
                <span>Invites</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="add">Add invitees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-white rounded-xl p-3 space-y-2 border border-gray-300">
            <Input
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-white border border-gray-300 placeholder:text-gray-500 text-black rounded-md"
            />
            <Input
              placeholder="Enter Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-white border border-gray-300 placeholder:text-gray-500 text-black rounded-md"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
