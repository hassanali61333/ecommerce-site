self.addEventListener("push", (event) => {
  console.log("🔥 PUSH EVENT RECEIVED");

  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {
    console.error("Push data error:", error);
  }

  event.waitUntil(
    self.registration.showNotification(
      data.title || "BuySahi",
      {
        body: data.body || "New Order Received",
        icon: "/icon.png",
        badge: "/icon.png",
      }
    )
  );
});