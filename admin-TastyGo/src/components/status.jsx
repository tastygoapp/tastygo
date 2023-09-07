import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { getDeliveryPartner as getDeliveryPartnerApi, updateStatus } from "../services/deliveryPartner";

const Status = () => {
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [updatedDeliveryPartners, setUpdatedDeliveryPartners] = useState([]);

  const columns = [
    {
      title: "First Name",
      data: "delivery_partner_first_name",
    },
    {
      title: "Last Name",
      data: "delivery_partner_last_name",
    },
    {
      title: "Status",
      data: "status",
    },
    {
      title: "City",
      data: "city",
    },
    {
      title: "Pin",
      data: "pin",
    },
  ];

  const fetchDeliveryPartners = async () => {
    try {
      const { data } = await getDeliveryPartnerApi();
      setDeliveryPartners(data);
      setUpdatedDeliveryPartners(data);
    } catch (error) {
      console.error("Error fetching delivery partners:", error);
    }
  };

  const handleStatusUpdate = (index, newStatus) => {
    const updatedPartners = [...updatedDeliveryPartners];
    updatedPartners[index].status = newStatus;
    updatedPartners[index].statusChanged = true;
    debugger;
    console.log("Updating status for partner:", updatedPartners[index].delivery_partner_id); // Debugging line
    setUpdatedDeliveryPartners(updatedPartners);
  };

  const handleStatusSubmit = async () => {
    try {
      const promises = updatedDeliveryPartners.map(async (partner, index) => {
        if (partner.statusChanged) {
          const delivery_partner = { ...partner };
          debugger;

          await updateStatus(delivery_partner.delivery_partner_id, delivery_partner.status);
          console.log(delivery_partner.status)
          console.log(delivery_partner.delivery_partner_id)
          const updatedPartners = [...updatedDeliveryPartners];
          updatedPartners[index].statusChanged = false;
          setUpdatedDeliveryPartners(updatedPartners);
        }
      });

      await Promise.all(promises);

      setDeliveryPartners(updatedDeliveryPartners);
      alert("Status updates submitted successfully!");
    } catch (error) {
      console.error("Error submitting status updates:", error);
      alert("Error submitting status updates");
    }
  };

  useEffect(() => {
    fetchDeliveryPartners();
  }, []);

  return (
    <div>
        <h1 style={{ textAlign: 'center', margin: 10 }}>    Tasty GO</h1>
     
    
     <h2 style={{ textAlign: 'center', marginRight: 5 }}>Restaurant List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.data}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {deliveryPartners.map((deliveryPartner, index) => (
            <tr key={deliveryPartner.id}>
              {columns.map((column) => (
                <td key={column.data}>
                  {column.data === "status" ? (
                    <select
                      value={updatedDeliveryPartners[index].status}
                      onChange={(e) => handleStatusUpdate(index, e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  ) : (
                    deliveryPartner[column.data]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <button onClick={handleStatusSubmit}>Submit Status Updates</button>
    </div>
  );
};

export default Status;
