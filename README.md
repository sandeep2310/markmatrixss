# Sales Enquiry Test Website

This is a static HTML/CSS/JavaScript test website for a sales and enquiry related business.

## Pages

- `index.html` - Home page with editable headings, text, image, and call-to-action links
- `products.html` - Our Product Range page with category filters and expandable product details
- `clients.html` - Our Pet Clients page with sample company names, test logos, and interactive cards
- `about.html` - About Us page with editable text, links, and image
- `contact.html` - Contact Us page with enquiry form validation and simulated delivery log

## Contact Form Notes

The form validates:

- Name is mandatory
- Mobile/contact number is mandatory

After submit, it shows:

> Thank you. We will connect with you shortly.

Because this is a static website, it cannot directly send real email or SMS by itself. The current form simulates:

- Email to `abc@abc.com`
- SMS to `99999999999`

To send real messages later, connect the form to a backend API or a third-party service such as EmailJS, Formspree, Netlify Forms, Twilio, or your hosting provider's form service.

## How To Edit

Open the HTML files and replace sample headings, paragraphs, images, client names, product names, and links with your actual details.

## How To Run

Open `index.html` directly in a browser, or upload the folder contents to GitHub Pages, Netlify, Vercel, or another static hosting provider.
