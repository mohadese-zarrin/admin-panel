import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {

  return (
    <>

      <TheSidebar />

      <TheContent />
    </>

  )
}

export default TheLayout

// container-fluid