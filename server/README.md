# Instagram API Setup Guide for @avasaastays

This backend includes an Express proxy at `GET /api/instagram/photos` to fetch your Instagram feed. By default, it will return high-quality curated placeholder photos so your design stays responsive and loaded.

Follow these steps to configure your live Instagram feed:

## Step 1: Create a Meta Developer App
1. Go to the [Meta for Developers Portal](https://developers.facebook.com/) and log in with your Facebook credentials.
2. Click **My Apps** -> **Create App**.
3. Select **Other** -> **Consumer** as your app type.
4. Set an app name (e.g. `Avaasa Website Display`).

## Step 2: Configure Instagram Basic Display
1. In your App Dashboard, scroll down and find **Instagram Basic Display**, then click **Set Up**.
2. Click **Create New App** at the bottom of the page.
3. In the settings, add your app details:
   - Valid OAuth Redirect URIs: `http://localhost:5001/` (or your production website domain)
   - Deauthorize Callback URL: `http://localhost:5001/`
   - Data Deletion Request URL: `http://localhost:5001/`

## Step 3: Add your Instagram Account as a Tester
1. In the left menu of the dashboard, go to **App Roles** -> **Roles**.
2. Scroll to the **Instagram Testers** section and click **Add Instagram Testers**.
3. Enter your Instagram username (`avasaastays`) and click submit.
4. On a phone or web browser, log in to Instagram as `@avasaastays`.
5. Go to **Settings** -> **Apps and Websites** -> **Tester Invites** and **Accept** the invite from your Meta App.

## Step 4: Generate your Long-Lived Token
1. Go back to your Meta Developer Dashboard, click **Instagram Basic Display** -> **Basic Display**.
2. Scroll to the **User Token Generator** section.
3. Click **Generate Token** next to `@avasaastays`.
4. Log in and authorize your account to generate a **Short-Lived Access Token**. Copy it.

### Exchange for a Long-Lived Token (60 days)
To exchange your short-lived token for a long-lived token, send a request from your terminal:
```bash
curl -X GET "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret={your_instagram_app_secret}&access_token={your_short_lived_token}"
```
*(Your Instagram App Secret can be found under the Instagram Basic Display settings page.)*

Alternatively, you can query this URL in your browser. It will return a 60-day `access_token` string.

## Step 5: Configure Environment Variables
1. Open the file `server/.env`.
2. Update the token variable:
   ```env
   INSTAGRAM_ACCESS_TOKEN=your_long_lived_60_day_token_here
   ```
3. Restart your backend server (`npm run dev` inside `server/`). The website will now pull your feed dynamically!
