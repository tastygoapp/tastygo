
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
function NavigationBar() {

const nav=useNavigate()
 
  
    // redirect to login page

  

  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
         
          <Nav className="me-auto">
          <Nav.Link href="/">Login </Nav.Link>
            <Nav.Link href="/restaurants">All Restaurant List</Nav.Link>
            <Nav.Link href="/addRestaurant">Add Restaurant</Nav.Link>
            <Nav.Link href="/addDeliveryPartner">Add delivery</Nav.Link>
            <Nav.Link href="/status">Delivery Status</Nav.Link>
            <Nav.Link href="/addOffer">Add Offer Data</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavigationBar
