import React, { useEffect } from 'react'
import * as antd from 'antd'

export default () => {
  useEffect(() => {
    console.log(antd)
  }, [])

  return <div>antd loaded</div>
}
