import { readContacts } from "@/app/api/admin/admin";
import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Contact {
  role: string;
  name: string;
  email: string;
  phoneNumber: string;
  option: string;
  comment: string;
  createdAt: Date;
}

export default function ContactUs() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const temp = await readContacts();
        const contactsWithDate = temp.map((contact: Contact) => ({
          ...contact,
          createdAt: new Date(contact.createdAt),
        }));
        setContacts(contactsWithDate);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
  
    fetchContacts();
  }, []);
  

  return (
    <>
      <Text fontSize="1.5rem" mb={10}>
        Contact us information
      </Text>
      {contacts?.map((contact: Contact, index: number) => (
        <Box mb={10} fontSize="1.1rem" key={index}>
          <p>
            <b>Name:</b> {contact?.name}
          </p>
          <p>
            <b>Role:</b> {contact?.role}
          </p>
          <p>
            <b>Email:</b> {contact?.email}
          </p>
          <p>
            <b>Phone number:</b> {contact?.phoneNumber}
          </p>
          <p>
            <b>Reason:</b> {contact?.option}
          </p>
          <p>
            <b>Comment:</b> {contact?.comment}
          </p>
          <p>
            <b>Date:</b> {contact?.createdAt?.toDateString()}
          </p>
          <p>
            <b>Time:</b> {contact?.createdAt?.toTimeString()}
          </p>
        </Box>
      ))}
    </>
  );
}
