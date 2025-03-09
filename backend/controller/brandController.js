const Brand = require('../models/brand.model')
const Perfume = require('../models/perfume.model')

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

const addBrand = async (req, res) => {
  const { brandName } = req.body;
  try {
    let brand = await Brand.findOne({ brandName })
    if (brand) {
      return res.status(400).json({ success: false, error: "Brand already exists" })
    }
    const newBrand = new Brand({ brandName });
    await newBrand.save();
    res.status(201).json({ success: true, message: "Brand created successfully" });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const deleteBrand = async (req, res) => {
  const brandId = req.params.brandId;

  try {
    // Kiểm tra xem brandId có đang được sử dụng trong Perfume không
    const perfumeExists = await Perfume.findOne({ brand: brandId });

    if (perfumeExists) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete this brand because it is being used in perfume ${perfumeExists.perfumeName}`,
      });
    }

    // Nếu không có nước hoa nào sử dụng brand, tiến hành xóa
    const brand = await Brand.findByIdAndDelete(brandId);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.json({ success: true, message: "Brand deleted successfully" })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}


const updateBrand = async (req, res) => {
  const id = req.params.brandId
  const { brandName } = req.body

  try {
    // Kiểm tra xem brand có tồn tại không
    const existingBrand = await Brand.findById(id)
    if (!existingBrand) {
      return res.status(404).json({ success: false, error: "Brand not found" })
    }

    // Cập nhật thương hiệu
    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { brandName },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: "Brand updated successfully", brand: updatedBrand })
  } catch (error) {
    console.error("Update Brand Error:", error)
    res.status(500).json({ success: false, error: "Error updating brand" })
  }
};


module.exports = {
  addBrand,
  deleteBrand,
  updateBrand,
  getAllBrands
}