'use client';

import { useState } from "react";

interface AlertErrorProps {
  errorCode?: number | null;
  message?: string;
}


export default function AlertError({ errorCode, message }: AlertErrorProps) {
    const [isVisible, setIsVisible] = useState(false)
    const errorMessages = {
        404: 'Could not find Pokemon',
        400: " Pokemon already exists",
        500: "There was an issue with the database"
  
    }

 if (!errorCode && !message) return null;
 
 return (
    <span>AlertError</span>
  )
}