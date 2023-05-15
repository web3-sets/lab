import * as React from 'react'

import classNames from 'clsx'

interface ConditionCardProps {
  className?: string
  id: string
  eid: string
  name: string
  type: string
  signature: string
  args: Array<{
    index: number
    type: string
    condition: string
    value: string
    selector: string
  }>
}

export const ConditionCard = ({ className, id, eid, name, type, signature, args }: ConditionCardProps) => {
  const classes = classNames(className, 'ConditionCard card')
  return (
    <div className={classes}>
      <p className="text-xs text-gray-700 dark:text-gray-400">{type}</p>
      <h3 className="text font-extrabold text-gray-900 dark:text-white">{name}</h3>
      <p className="my-4">{signature}</p>
      <p className="text-xs font-bold">argument conditionals</p>
      <div className="mt-2">
        {args?.map((argument, index) => {
          return (
            <div key={index} className="flex items-center justify-between rounded-lg bg-neutral-100 p-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{argument.index}</p>
              <span className="">{argument.condition}</span>
              <div className="flex flex-col gap-2 text-xs">
                <span className="">type: {argument.type}</span>
                <span className="">value: {argument.value}</span>
                {argument.selector && <span className="">selector: {argument.selector}</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
