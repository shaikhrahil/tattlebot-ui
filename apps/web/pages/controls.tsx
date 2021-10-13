import { useDevices } from '@tbot/hooks'
import { IDevice } from '@tbot/types'
import { nanoid } from 'nanoid'
import React, { useState } from 'react'

const DeviceList = () => {
  const deviceReq = useDevices()
  const [selectedDevice, selectDevice] = useState<IDevice>()

  if (deviceReq.loading) return <p>Loading ... </p>
  if (deviceReq.error) return <p> {deviceReq.error} </p>

  return (
    <div className="tw-flex">
      <div className="tw-w-1/2">
        {deviceReq.data.data.map((d) => (
          <div key={nanoid()}>
            <p onClick={() => selectDevice(d)}>{d.name}</p>
            <p>{d.observers?.length || 0} observer(s) </p>
          </div>
        ))}
      </div>
      {selectedDevice && (
        <div className="tw-w-1/2">
          {selectedDevice.observers.map((o) => {
            return <p key={nanoid()}> {o.name}</p>
          })}
        </div>
      )}
    </div>
  )
}

const Controls = () => {
  return (
    <section>
      <div>My Devices</div>
      <DeviceList />
    </section>
  )
}

export default Controls
