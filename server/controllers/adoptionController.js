const { User, Animal, Adoption, Shelter } = require("../models/indexModels");


// Fetch all adoptions
exports.getAllAdoptionRequests = async(req,res) =>{
  try {
    const allAdoptions = await Adoption.findAll({
      include: [
        {model: Animal},
        {model: User, attributes: {exclude: ['password']}},
        {model: Shelter, attributes: {exclude: ['password']}},
      ],
    });
    return res.status(200).json(allAdoptions);
  }catch(error){
    console.log('Error fetching adoptions', error);
    return res.status(500).json({message:'Server Error', error: error.message});
  }
}


// Get user adoption requests
exports.getUserAdoptionRequests = async (req, res) => {
  try {
    const { userID } = req.params;
    console.log("\n",req.params,"\n");
    const adoption = await Adoption.findAll({
      where: {userID: userID},
        

          through: { attributes: [] }, // Don't include join table data
          include: [
            { model: Animal },
            { model: Shelter, attributes: { exclude: ["password"] } },
            { model: User, attributes: { exclude: ["password"]}},
          ],
        
      
    });


    if (!adoption) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(adoption);
  } catch (error) {
    console.error("Error fetching user adoption requests:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

//Create new adoption request
exports.createAdoptionRequest = async (req, res) => {
  try {
    const adoptionData = req.body;

    const newAdoption = await Adoption.create(adoptionData);
    return res.status(201).json(newAdoption);
  } catch (error) {
    console.error("Error creating adoption request:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Remove adoption request
exports.removeAdoptionRequest = async (req, res) => {
  try {
    const { userID, animalID } = req.params;
    // Check its presence in adoption table
    const adoptionRequest = await Adoption.findOne({
      where: { userID, animalID },
    });

    if (!adoptionRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Terminate adoption request
    await adoptionRequest.destroy();

    return res.status(200).json({ message: "Adoption request terminated" });
  } catch (error) {
    console.error("Error terminating request:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
