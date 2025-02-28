const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;">
  <div style="background: #6c63ff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #fff; font-size: 24px; margin: 0;">Confirm Your Email Address</h1>
  </div>
  <div style="background-color: #fff; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <p>Hi there,</p>
    <p>Thank you for signing up! To complete your registration, please verify your email address by using the code below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 36px; font-weight: bold; color: #6c63ff;">{verificationCode}</span>
    </div>
    <p>This verification code is valid for 15 minutes. Enter it on the verification page to finalize your registration.</p>
    <p>If you did not create an account, feel free to ignore this email.</p>
    <p>Best regards,<br>Team Apex Market</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
    <p>This is an automated message. Please do not reply.</p>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;">
  <div style="background: #6c63ff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #fff; font-size: 24px; margin: 0;">Password Reset Requested</h1>
  </div>
  <div style="background-color: #fff; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you did not make this request, please ignore this email. Otherwise, click the link below to reset your password:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #6c63ff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>The YourApp Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
    <p>This is an automated message. Please do not reply.</p>
  </div>
</body>
</html>
`;

const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;">
  <div style="background: #6c63ff; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #fff; font-size: 24px; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #fff; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're happy to inform you that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #6c63ff; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 36px;">
        ✓
      </div>
    </div>
    <p>If this action wasn't initiated by you, please contact our support team immediately.</p>
    <p>To keep your account safe, we recommend:</p>
    <ul>
      <li>Using a strong and unique password</li>
      <li>Enabling two-factor authentication</li>
      <li>Regularly updating your passwords</li>
    </ul>
    <p>Thank you for helping us secure your account.</p>
    <p>Best regards,<br>The YourApp Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
    <p>This is an automated message. Please do not reply.</p>
  </div>
</body>
</html>
`;

const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Community!</title>
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f2f2f2; margin: 0; padding: 0;">
  <!-- Main container -->
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);">
    
    <!-- Header Section with Visual -->
    <div style="background: linear-gradient(45deg, #6c63ff, #3A3A3A); padding: 40px; text-align: center; color: #ffffff;">
      <img src="https://example.com/welcome-icon.png" alt="Welcome Icon" style="width: 80px; margin-bottom: 20px;" />
      <h1 style="font-size: 36px; font-weight: bold; margin: 0;">Welcome to Our Community!</h1>
      <p style="font-size: 18px; margin: 10px 0 0;">We're thrilled to have you on board!</p>
    </div>

    <!-- Body Section with Content -->
    <div style="padding: 30px;">
      <p style="font-size: 16px; color: #333;">Hello <strong>{userName}</strong>,</p>
      <p style="font-size: 16px; color: #333;">
        We're excited to welcome you to our vibrant community. At <strong>Apex Market</strong>, we strive to create an amazing experience for our users, and we're happy you've decided to join us!
      </p>

      <!-- Key Features Section -->
      <div style="background-color: #f7f7f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #6c63ff; text-align: center;">What to Expect:</h3>
        <ul style="list-style: none; padding: 0; color: #555; font-size: 16px;">
          <li style="margin-bottom: 10px;">
            <img src="https://example.com/icon1.png" alt="Icon 1" style="width: 20px; vertical-align: middle; margin-right: 10px;" />
            Exclusive access to new features
          </li>
          <li style="margin-bottom: 10px;">
            <img src="https://example.com/icon2.png" alt="Icon 2" style="width: 20px; vertical-align: middle; margin-right: 10px;" />
            Personalized recommendations
          </li>
          <li style="margin-bottom: 10px;">
            <img src="https://example.com/icon3.png" alt="Icon 3" style="width: 20px; vertical-align: middle; margin-right: 10px;" />
            24/7 Support from our team
          </li>
        </ul>
      </div>

      <!-- Call to Action Section -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="{dashboardURL}" style="background-color: #6C63FF; color: #ffffff; padding: 15px 30px; font-size: 16px; text-decoration: none; border-radius: 5px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);">
          Explore Your Dashboard
        </a>
      </div>

      <!-- Social Media Links -->
      <div style="text-align: center;">
        <p style="font-size: 14px; color: #888; margin-bottom: 15px;">Follow us on:</p>
        <a href="https://facebook.com" style="text-decoration: none; margin-right: 10px;">
          <img src="https://example.com/facebook-icon.png" alt="Facebook" style="width: 24px;" />
        </a>
        <a href="https://twitter.com" style="text-decoration: none; margin-right: 10px;">
          <img src="https://example.com/twitter-icon.png" alt="Twitter" style="width: 24px;" />
        </a>
        <a href="https://instagram.com" style="text-decoration: none;">
          <img src="https://example.com/instagram-icon.png" alt="Instagram" style="width: 24px;" />
        </a>
      </div>
    </div>

    <!-- Footer Section -->
    <div style="background-color: #f8f8f8; padding: 20px; text-align: center; color: #aaa; font-size: 12px;">
      <p style="margin: 0;">You're receiving this email because you signed up for Apex Market.</p>
      <p style="margin: 5px 0;">If you did not sign up, please <a href="{unsubscribeURL}" style="color: #6C63FF; text-decoration: none;">unsubscribe</a>.</p>
    </div>
  </div>
</body>
</html>
`;


module.exports = {
    VERIFICATION_EMAIL_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE
}