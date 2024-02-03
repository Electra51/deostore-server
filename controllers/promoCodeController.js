import fs from "fs";
import slugify from "slugify";
import promoCodeModel from "../models/promoCodeModel.js";

// export const createPromoCodeController = async (req, res) => {
//   try {
//     const { name, start_date, discount_rate, end_date, use_time, active } =
//       req.fields;

//     console.log("first", req.fields);
//     // Convert promo_code to uppercase
//     // promo_code = promo_code?.toUpperCase();

//     // Validation
//     switch (true) {
//       case !name:
//         return res.status(500).send({ error: "name is Required" });
//       case !discount_rate:
//         return res.status(500).send({ error: "discount_rate is Required" });
//       case !start_date:
//         return res.status(500).send({ error: "start_date is Required" });
//       case !end_date:
//         return res.status(500).send({ error: "end_date is Required" });
//       case !use_time:
//         return res.status(500).send({ error: "use_time is Required" });
//     }

//     const promocode = new promoCodeModel({
//       ...req.fields,
//       slug: slugify(name),
//     });

//     console.log("e", req.fields);
//     // await promocode.save();

//     res.status(201).send({
//       success: true,
//       message: "Promocode Created Successfully",
//       promocode,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in creating promocode",
//     });
//   }
// };

export const createPromoCodeController = async (req, res) => {
  try {
    const { name, start_date, discount_rate, end_date, use_time, active } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is Required" });
      case !discount_rate:
        return res.status(500).send({ error: "discount_rate is Required" });
      case !start_date:
        return res.status(500).send({ error: "start_date is Required" });
      case !end_date:
        return res.status(500).send({ error: "end_date is Required" });
      case !use_time:
        return res.status(500).send({ error: "use_time is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const promoCode = new promoCodeModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      promoCode.photo.data = fs.readFileSync(photo.path);
      promoCode.photo.contentType = photo.type;
    }
    await promoCode.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      promoCode,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all products
export const getPromocodeController = async (req, res) => {
  try {
    const promoCode = await promoCodeModel
      .find({})

      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: promoCode.length,
      message: "ALlpromoCode ",
      promoCode,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
export const getSinglePromocodeController = async (req, res) => {
  try {
    const promoCode = await promoCodeModel.findOne({ _id: req.params.pid });

    res.status(200).send({
      success: true,
      message: "Single PromoCode Fetched",
      promoCode,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

//delete controller
export const deletePromocodeController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
export const updatePromocodeController = async (req, res) => {
  try {
    const { name, start_date, discount_rate, end_date, use_time, active } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is Required" });
      case !discount_rate:
        return res.status(500).send({ error: "discount_rate is Required" });
      case !start_date:
        return res.status(500).send({ error: "start_date is Required" });
      case !end_date:
        return res.status(500).send({ error: "end_date is Required" });
      case !use_time:
        return res.status(500).send({ error: "use_time is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const promoCode = await promoCodeModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      promoCode.photo.data = fs.readFileSync(photo.path);
      promoCode.photo.contentType = photo.type;
    }
    await promoCode.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      promoCode,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// Add a new controller function for updating the promo code status
export const updatePromoCodeStatusController = async (req, res) => {
  try {
    const { active } = req.fields;

    if (active === undefined || active === null) {
      return res.status(400).send({ error: "Invalid 'active' parameter" });
    }

    const promoCode = await promoCodeModel.findByIdAndUpdate(
      req.params.pid,
      { active },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: `PromoCode ${active ? "Activated" : "Deactivated"} successfully`,
      promoCode,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error updating promo code status",
    });
  }
};

//order status
export const promoCodeStatusController = async (req, res) => {
  try {
    const { id } = req.params; // Fix the parameter name
    // console.log("promoId", promoId);
    const { active } = req.body;
    console.log("promoId", id, active);
    // Make sure to handle the case where the promoCode is not found
    const promoCode = await promoCodeModel.findByIdAndUpdate(
      id,
      { active },
      { new: true }
    );

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: "Promo code not found",
      });
    }

    res.json(promoCode);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Promo Code Status",
      error,
    });
  }
};

//user promocode
export const promoCodeGetForUserController = async (req, res) => {
  try {
    // Logic to get a promo code for the logged-in user
    const promoCode = await promoCodeModel.findOne({ active: true });

    res.status(200).json({
      success: true,
      promoCode,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching promo code",
    });
  }
};

export const promoCodeValidateController = async (req, res) => {
  try {
    const { promoCode } = req.body;

    // Check if the promo code exists in the database
    const existingPromoCode = await promoCodeModel.findOne({
      name: promoCode,
    });

    if (!existingPromoCode) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid promo code" });
    }

    // Check if the promo code has been used up
    if (existingPromoCode.use_time <= 0) {
      return res.status(400).json({
        success: false,
        message: "This promo Code has expired",
      });
    }

    // You may add additional logic here, e.g., checking if the promo code is active, within date range, etc.

    // Decrement the use_time counter and save the updated promo code
    existingPromoCode.use_time -= 1;
    await existingPromoCode.save();

    // Respond with the discount rate
    res.json({ success: true, discountRate: existingPromoCode.discount_rate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
