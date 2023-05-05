import { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();
const minCompanyNameLength = 2
const maxCompanyNameLength = 60
const minPhoneNumberLength = 2
const maxPhoneNumberLength = 20
const minNameLength = 2
const maxNameLength = 60
const validZipCodeLength = 5

interface companyData {
  name: string;
  phone: number
}

interface customerData {
  firstName: string;
  lastName: string;
  zipCode: number;
  mail: string
}

interface companyDataParent {
  id : string;
  companyData: companyData;
  customerData: customerData
}


const companyDataPersistenceObject : companyDataParent[]= []

router.post("/checkout", (req: Request & { body: companyDataParent }, res: Response) => {
  let companyData: companyData = req.body.companyData;

  if(companyData.name.length > maxCompanyNameLength && companyData.name.length < minCompanyNameLength)
  {
    return res.status(400).json({ error: "Company Name should have length between 2 to 60 characters" });
  }

  if (typeof companyData.phone !== "number") {
    return res.status(400).json({ error: "PhoneNumber is not a number" });
  }

  if (companyData.phone.toString().length < minPhoneNumberLength || companyData.phone.toString().length > maxPhoneNumberLength) {
    return res.status(400).json({ error: "PhoneNumber should be between 2 until 20 digits" });
  }

  req.body.id = uuidv4();
  companyDataPersistenceObject.push(req.body);
  return res.status(200).json(companyDataPersistenceObject);

});


router.put("/checkout/:id", (req: Request & { body: customerData }, res: Response) => {
  const companyId = req.params.id;
  const customerData: customerData = req.body.customerData;

  const companyParentObject: companyDataParent | undefined = companyDataPersistenceObject.find(obj => obj.id === companyId);

  if (companyParentObject == undefined) {
    return res.status(400).json({ error: "Incorrect Company Id" });
  }

  if(customerData.firstName.length > maxNameLength && customerData.firstName.length < minNameLength)
  {
    return res.status(400).json({ error: "Customer First Name should have length between 2 to 60 characters" });
  }

  if(customerData.lastName.length > maxNameLength && customerData.lastName.length < minNameLength)
  {
    return res.status(400).json({ error: "Customer Last Name should have length between 2 to 60 characters" });
  }
  if (typeof customerData.zipCode !== "number") {
    return res.status(400).json({ error: "Zipcode is not a number" });
  }

  if (customerData.zipCode.toString().length != validZipCodeLength ) {
    return res.status(400).json({ error: "Zipcode should be exactly 5 digits" });
  }

  companyParentObject.customerData = customerData
  companyDataPersistenceObject.push(companyParentObject);
  return res.status(200).json(companyDataPersistenceObject);

});

router.get("/checkout/:id", (req: Request, res: Response) => {
  const companyId = req.params.id;

  const companyParentObject: companyDataParent | undefined = companyDataPersistenceObject.find(obj => obj.id === companyId);

  if (companyParentObject == undefined) {
    return res.status(400).json({ error: "Incorrect Company Id" });
  }

  return res.status(200).json(companyParentObject);

});

export { router };
