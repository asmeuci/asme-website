to run locally on the terminal enter the following commands 

cd asme-website
```
npm install 
```
then 
```
npm run dev  
```

## Network With ASME payment links

The registration form uses separate Stripe Payment Links for its two ticket
types. Configure these server-side environment variables locally and in Vercel:

```text
STRIPE_PAYMENT_LINK_MEAL_URL=https://buy.stripe.com/...
STRIPE_PAYMENT_LINK_NO_MEAL_URL=https://buy.stripe.com/...
```

Each Stripe Payment Link must redirect successful payments to:

```text
https://YOUR-DOMAIN/network/success?session_id={CHECKOUT_SESSION_ID}
```

The existing Stripe Price environment variables are still used to display each
ticket's current product name and price on the registration form.


TODO Website Checklist
- [ ] replace bg with paper texture bg
- [ ] add images to the Links section
- [ ] make asme board section page per the figma
- [ ] make the project teams section page (peterworks + hpvc)
- [ ] make asme yearbook page
- [ ] make events section page ( need to collaborate later on what we want specifically) 
- [ ] add a dropdown menu button for the About button on the navbar



