import React, { useEffect } from 'react'
import $ from 'jquery'

export default () => {
  useEffect(() => {
    console.log($)
  }, [])

  return <div>jquery loaded</div>
}
