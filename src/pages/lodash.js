import React, { useEffect } from 'react'
import * as lodash from 'lodash'

export default () => {
  useEffect(() => {
    console.log(lodash)
  }, [])

  return <div>lodash loaded</div>
}
