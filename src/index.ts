import apiRoot, { Credentials } from "./sdk/root";

// Create a cart and add a product
// product needs to be published, have a price in the currency of the cart and the country of the cart
async function createCartWithProduct(credentials: Credentials, productId: string, customerId: string) {
  try {
    const result = await apiRoot(credentials)
      .carts()
      .post({
        body: {
          country: "DE",
          customerEmail: "mehtap.parkinson@commercetools.com",
          customerId: customerId,
          currency: "EUR",
          lineItems: [
            {
              productId: productId,
              quantity: 1
            }
          ]
        }
      })
      .execute();
    return result.body;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Get cart by ID
async function getCartById(credentials: Credentials, cartId: string) {
  try {
    const result = await apiRoot(credentials)
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute();
    return result.body;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Add shipping address to cart
async function addShippingAddressToCart(credentials: Credentials, cartId: string, version: number) {
  try {
    const result = await apiRoot(credentials)
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "setShippingAddress",
              address: {
                key: "shipping-address",
                country: "DE",
                city: "Berlin",
                streetName: "Alexanderplatz",
                streetNumber: "2",
                firstName: "Mehtap",
                lastName: "Parkinson",
                email: "mehtap.parkinson@commercetools.com",
                postalCode: "10178"
              }
            }
          ]
        }
      })
      .execute();
    return result.body;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Add billing address to cart
async function addBillingAddressToCart(credentials: Credentials, cartId: string, version: number) {
  try {
    const result = await apiRoot(credentials)
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "setBillingAddress",
              address: {
                email: "mehtap.parkinson@commercetools.com",
                firstName: "Mehtap",
                lastName: "Parkinson",
                key: "billing-address",
                country: "ES",
                postalCode: "08007",
                city: "Barcelona",
                streetName: "Passaig de Gracia",
                streetNumber: "2"
              }
            }
          ]
        }
      })
      .execute();
    return result.body;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Get shipping methods for a cart
async function getShippingMethodsForACart(credentials: Credentials, cartId: string) {
  try {
    const results = await apiRoot(credentials)
      .shippingMethods()
      .matchingCart()
      .get({
        queryArgs: {
          cartId: cartId
        }
      })
      .execute();
    return results.body.results;
  } catch (err) {
    console.log(err);
    throw err;
  }
}


// add shipping method to cart
async function addShippingMethodToCart(credentials: Credentials, cartId: string, version: number) {
  try {
    const result = await apiRoot(credentials)
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "setShippingMethod",
              shippingMethod: {
                typeId: "shipping-method",
                id: (await getShippingMethodsForACart(credentials, cartId))[0].id
              }
            }
          ]
        }
      })
      .execute();
    return result.body;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Create payment
async function createPayment(credentials: Credentials) {
  try {
    const result = await apiRoot(credentials)
      .payments()
      .post({
        body: {
          amountPlanned: {
            currencyCode: "EUR",
            centAmount: 8900
          },
          paymentMethodInfo: {
            paymentInterface: "STRIPE",
            method: "CREDIT_CARD"
          },
          transactions: [
            {
              type: "Charge",
              amount: {
                currencyCode: "EUR",
                centAmount: 8900
              }
            }
          ]
        }
      })
      .execute();
    return result.body;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Add payment to cart
async function addPaymentToCart(credentials: Credentials, cartId: string, version: number, paymentId: string) {
  try {
    const result = await apiRoot(credentials)
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: version,
          actions: [
            {
              action: "addPayment",
              payment: {
                typeId: "payment",
                id: paymentId
              }
            }
          ]
        }
      })
      .execute();
    return result.body;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Create order from cart
async function createOrderFromCart(credentials: Credentials, cartId: string, version: number) {
  try {
    const result = await apiRoot(credentials)
      .orders()
      .post({
        body: {
          cart: {
            id: cartId,
            typeId: "cart"
          },
          version: version
        }
      })
      .execute();
    return result.body;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function main() {
  const credentials = {
    projectKey: process.env.CTP_PROJECT_KEY as string,
    clientID: process.env.CTP_CLIENT_ID as string,
    clientSecret: process.env.CTP_CLIENT_SECRET as string,
    scopes: process.env.CTP_SCOPES as string,
  };

  // nightstand product id 
  // Minimalist Cedar Nightstand
  const productId = "4494563c-9d5b-4097-81cd-34ea8c69fac5";

  // my customer id
  const customerId = "e144bfc1-c21e-47a9-bbce-9d9b25dcc49f"; 

  const cart = await createCartWithProduct(credentials, productId, customerId);
  const cartId = cart.id;

  let cartDetails = await getCartById(credentials, cartId);
  await addShippingAddressToCart(credentials, cartId, cartDetails.version);

  cartDetails = await getCartById(credentials, cartId);
  await addBillingAddressToCart(credentials, cartId, cartDetails.version);

  cartDetails = await getCartById(credentials, cartId);
  await addShippingMethodToCart(credentials, cartId, cartDetails.version);

  const payment = await createPayment(credentials);
  const paymentId = payment.id;

  cartDetails = await getCartById(credentials, cartId);
  await addPaymentToCart(credentials, cartId, cartDetails.version, paymentId);

  cartDetails = await getCartById(credentials, cartId);
  const order = await createOrderFromCart(credentials, cartId, cartDetails.version);
  console.log("🎉 Succesfully ordered: ", order);
}

main().then(() => {
  console.log("Yay!🥰");
}).catch(err => {
  console.error("Error:", err);
});