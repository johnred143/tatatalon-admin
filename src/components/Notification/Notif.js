import React from 'react'

function showNotification (){
    const notification = new Notification("new notif", {
        body:"sample"
    
      })
      notification.onClick = (event) => {
        window.location.href =" http://localhost:3001";
      }
      if (Notification.permission === "granted") {
        showNotification();
      } else if(Notification.permission !== "denied"){
        Notification.requestPermission().then(permission => {
            if(permission === "granted"){
                showNotification();
            }
        })
      }
  return (
   showNotification()
  )
}

export default showNotification



