import * as React from 'react'

import { c } from '@wagmi/cli/dist/config-c09a23a5'
import classNames from 'clsx'

interface CodePreviewProps {
  children: any
  className?: string
}

export const CodePreview = ({ children, className }: CodePreviewProps) => {
  const classes = classNames(className, 'CodePreview')
  return (
    <pre className={classes}>
      <pre>{children}</pre>
    </pre>
  )
}
