# GlowAlly Shopify App Assignment – Task 3: App Proxy + Private API Hook

This repository contains a working Shopify App Proxy implementation using a Remix-based app.
It fetches mock skincare recommendation data per customer and returns it securely via the App Proxy route.

---

## 🚀 Quick Start

### 1. Clone this Repository

```bash
git clone https://github.com/Jassfeels/App-Proxy.git
cd App-Proxy
```

### 2. Run App Proxy (Remix App)

Navigate to the `app/` directory:

```bash
shopify app dev
```

This will open a secure tunnel via Cloudflare or ngrok, e.g.:

```
https://your-tunnel-url.trycloudflare.com
```

### 3. Set Up App Proxy in Shopify Partner Dashboard

* Go to your app > **App setup** > **App proxy**
* Add:

```
Subpath prefix: a
Subpath: recommendation
Proxy URL: https://your-tunnel-url.trycloudflare.com/proxy/recommendation
```

Shopify will now route:

```
https://your-store.myshopify.com/a/recommendation
```

to your app route:

```
app/routes/proxy.recommendation.jsx
```

### 4. Integrate on Theme Frontend (e.g. in `customers/account.liquid`)

```html
<div id="recommendation-box">Loading your skincare routine...</div>

<script>
fetch('/a/recommendation')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('recommendation-box');
    if (!data || !data.routine) {
      container.innerHTML = '<p>No recommendation found.</p>';
      return;
    }
    let html = '<h3>Your Skincare Routine</h3><ul>';
    data.routine.forEach(step => {
      html += `<li><strong>${step.step}:</strong> ${step.product}</li>`;
    });
    html += '</ul>';
    container.innerHTML = html;
  })
  .catch(() => {
    document.getElementById('recommendation-box').innerHTML = '<p>Error loading data.</p>';
  });
</script>
```

---

## 💡 Architecture Overview

* Shopify App Proxy route: `/a/recommendation`
* Backend handler at `app/routes/proxy.recommendation.jsx`
* Fetches mock data from external API
* Returns JSON securely to client
* Includes `Cache-Control: max-age=300` header for performance

---

## 📦 Mocked Data

* External API: [https://mocki.io/v1/8aa2c8fa-31f6-4ef5-a465-f3cf181be011](https://mocki.io/v1/8aa2c8fa-31f6-4ef5-a465-f3cf181be011)
* Represents simulated skincare routine per customer
* Can be replaced with live customer-based logic

---

## 🔐 Assumptions

* Customer is logged in when hitting `/a/recommendation`
* No Shopify Admin API used in this version (only mock API)
* App is running in dev mode (`shopify app dev`) during test

---

## ✅ Future Enhancements

* Use `X-Shopify-Customer-ID` header for personalization
* Fetch real quiz data or Shopify order history
* Cache results per-customer in Redis or file store
* Add authentication for production deployment

---

Feel free to fork or extend this base to create fully private, dynamic storefront features with Shopify App Proxy.
