import apiRoot, { Credentials } from "./sdk/root";

// get all products
async function getProducts(credentials: Credentials) {
  try {
    const result = await apiRoot(credentials)
      .products()
      .get()
      .execute();
    return result.body.results;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

//create a customer 
async function createCustomer(credentials: Credentials) {
  try {
    const result = await apiRoot(credentials)
      .customers()
      .post({
        body: {
          email: "mehtap.parkinson@commercetools.com",
          password: "123456",
          firstName: "Mehtap",
          lastName: "Parkinson",
          salutation: "Royal Highness The Duchess of Cambridge",
          key: "mehtap-parkinson"
        }
      })
      .execute();
    return result.body;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// create a product
async function createProduct(credentials: Credentials) {
  try {
    const result = await apiRoot(credentials)
      .products()
      .post({
        body: {
          key: "Cat-Napper-3001",
          productType: {
            id: "1d817dc0-ed31-4df5-b3db-e47f7f5fa383",
            typeId: "product-type"
          },
          name: {
            en: "Cat-Napper-3001"
          },
          slug: {
            en: `Cat-Napper-3001`
          },
          masterVariant: {
            prices: [
              {
                value: {
                  currencyCode: "EUR",
                  centAmount: 4200
                }
              }
            ],
            images: [
              {
                url: "https://i.ibb.co/x7b6Kp4/estrella-dibujada-mano-aislada-23-2151580033.jpg",
                label: "Master Image",
                dimensions: {
                  w: 303,
                  h: 197
                }
              }
            ]
          }
        }
      })
      .execute();
    return result.body;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// get product by id
async function getProductById(credentials: Credentials) {
  return apiRoot(credentials)
  .products()
  .withId({ ID: "4494563c-9d5b-4097-81cd-34ea8c69fac5" })
  .get()
  .execute()
  .catch((err: Error) => {
    console.log(err);
  });
}

// create a cart
async function createCart(credentials: Credentials) {
  return apiRoot(credentials)
  .carts()
  .post({
    body: {
      country:"DE",
      customerId:"e144bfc1-c21e-47a9-bbce-9d9b25dcc49f",
      currency: "EUR",
      lineItems: [
        {
          productId: "4494563c-9d5b-4097-81cd-34ea8c69fac5",
          quantity: 1
        }
      ]     
      }
  }) 
  .execute()
  .catch((err: Error) => {
    console.log(err);
  });
}

//get cart by id
async function getCart(credentials: Credentials) {
  return apiRoot(credentials)
  .carts()
  .withId({ ID: "39a0ccdf-89b6-4dda-b0e7-246fd90b26f8" })
  .get()
  .execute()
  .catch((err: Error) => {
    console.log(err);
  });
}

// edit cart, add shipping address
async function updateCartAddShippingAddress(credentials: Credentials) {
  return apiRoot(credentials)
  .carts()
  .withId({ ID: "39a0ccdf-89b6-4dda-b0e7-246fd90b26f8" })
  .post({
    body: {
      version:3,
      actions: [
        {
          action: "setShippingAddress",
          address: {
            key: "poo",
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
  .execute()
  .catch((err: Error) => {
    console.log(err);
  });
}

//get shipping methods for cart
async function getShippingMethodsForACart(credentials: Credentials) {
  try {
    const results = await apiRoot(credentials)
      .shippingMethods()
      .matchingCart()
      .get({
        queryArgs: {
          cartId: "39a0ccdf-89b6-4dda-b0e7-246fd90b26f8"
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
async function updateCartAddShippingMethod(credentials: Credentials) {
  return apiRoot(credentials)
  .carts()
  .withId({ ID: "39a0ccdf-89b6-4dda-b0e7-246fd90b26f8" })
  .post({
    body: {
      version: 7,
      actions: [
        {
          action: "setShippingMethod",
    
          shippingMethod: {
            typeId: "shipping-method",
            id: "72111da9-15db-4c90-aeaf-aee8499c32fc"
            
          }
        }
      ]
    }
  }) 
  .execute()
  .catch((err: Error) => {
    console.log(err);
  });
}

// add billing address to cart
async function updateCartAddBillingAddress(credentials: Credentials) {
  return apiRoot(credentials)
  .carts()
  .withId({ ID: "39a0ccdf-89b6-4dda-b0e7-246fd90b26f8" })
  .post({
    body: {
      version: 1,
      actions: [
        {
          action: "setBillingAddress",
          address: {
            email: "mehtap.parkinson@commercetools.com",
            firstName: "Mehtap",
            lastName: "Parkinson",
            key: "poo",
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
  .execute()
  .catch((err: Error) => {
    console.log(err);
  });
}

// create payment
async function createPayment(credentials: Credentials) {
  return apiRoot(credentials)
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
  .execute()
  .catch((err: Error) => {
    console.log(err);
  });
}

// add payment to cart
async function updateCartAddPaymentMethod(credentials: Credentials) {
  return apiRoot(credentials)
  .carts()
  .withId({ ID: "39a0ccdf-89b6-4dda-b0e7-246fd90b26f8" })
  .post({
    body: {
      version: 10,
      actions: [
        {
          action: "addPayment",
          payment: {
            typeId: "payment",
            id: "95354ce8-d997-4af7-95e7-566249cdcb28"
          }
        }
      ]
    }
      
  })
  .execute()
  .catch((err: Error) => {
    console.log(err);
  });
}

// create order
async function createOrder(credentials: Credentials) {
  return apiRoot(credentials)
  .orders()
  .post({
    body: {
      "cart" : {
        "id" : "39a0ccdf-89b6-4dda-b0e7-246fd90b26f8",
        "typeId" : "cart"
      },
      "version" : 12
    }
  })
  .execute()
  .catch((err: Error) => {
    console.log(err);
  });
}

//get order
async function getOrderById(credentials: Credentials) {
  return apiRoot(credentials)
  .orders()
  .withId({ ID: "d6487f05-1f62-4c1c-908f-e31f41ebae1d" })
  .get()
  .execute()
  .catch((err: Error) => {
    console.log(err);
  });
}


async function test() {
  const credentials = {
    projectKey: process.env.CTP_PROJECT_KEY as string,
    clientID: process.env.CTP_CLIENT_ID as string,
    clientSecret: process.env.CTP_CLIENT_SECRET as string,
    scopes: process.env.CTP_SCOPES as string,
  };
  // console.log(await createCustomer(credentials));

  // console.log(await getProducts(credentials));
  // console.log(await createProduct(credentials));
  // console.log(await getProductById(credentials));

  // console.log(await createCart(credentials));
  // console.log(await getCart(credentials));
  // console.log(await updateCartAddShippingAddress(credentials));
  // console.log(await updateCartAddShippingMethod(credentials));
  // console.log(await getShippingMethodsForACart(credentials));
  // console.log(await updateCartAddShippingMethod(credentials));
  // console.log(await updateCartAddBillingAddress(credentials));
  // console.log(await updateCartAddPaymentMethod(credentials));

  // console.log(await createPayment(credentials)); 
  // console.log(await createOrder(credentials)); 
  console.log(await getOrderById(credentials));
}


test().then(() => {
  console.log("Success");
});


//Cat Napper 3001 id:d1511f6c-1643-4aa5-9be7-8462a1fd1914
//payment id:b5c4e48b-9739-4900-acf2-e662e0fa3e68, new:'95354ce8-d997-4af7-95e7-566249cdcb28
//order id: 4671e77a-71d5-4122-bb11-52142f458aa6, new: d6487f05-1f62-4c1c-908f-e31f41ebae1d
// new cart id: 74315d6c-82c4-4e58-a582-6999df575a68, last one:39a0ccdf-89b6-4dda-b0e7-246fd90b26f8
