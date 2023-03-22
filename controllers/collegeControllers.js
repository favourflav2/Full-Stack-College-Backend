import axios from "axios";
import User from "../model/userModel.js";

export async function saveApiData(req, res) {
  const array = req.body;
  try {
    const college = await College.find({});
    //console.log(college)
    //console.log(req.body)
  } catch (e) {
    console.log(e);
  }
}

export async function searchCollege(req, res) {
  const { search } = req.body;

  try {
    const response = await axios.get(
      `${process.env.COLLEGE_API_URL}?api_key=${process.env.COLLEGE_API_KEY}&school.name=${search}&fields=id,school.name,school.alias,school.state,school.school_url,2020.cost.tuition,2020.student.size,2020.cost.roomboard,2020.student.demographics.men,2020.student.demographics.women,student.demographics.married,school.city,school.zip`
    );

    res.status(200).json(response.data.results);
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: `Something went wrong ERR CODE:${e.message}` });
  }
}

export async function searchCollegeById(req, res) {
  const { id } = req.params;
  //console.log(req.params)

  try {
    const response = await axios.get(
      `${process.env.COLLEGE_API_URL}?api_key=${process.env.COLLEGE_API_KEY}&id=${id}&fields=id,school.name,school.alias,school.state,school.school_url,2020.cost.tuition,2020.student.size,2020.cost.roomboard,2020.student.demographics.men,2020.student.demographics.women,student.demographics.married,school.city,school.zip`
    );

    res.status(200).json(response.data.results);
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: `Something went wrong ERR CODE:${e.message}` });
  }
}

export async function searchDegreeById(req, res) {
  const { id } = req.params;
  const { page } = req.query;
  let limit;

  try {
    const response = await axios.get(
      `${process.env.COLLEGE_API_URL}?api_key=${process.env.COLLEGE_API_KEY}&id=${id}&fields=programs.cip_4_digit.title,programs.cip_4_digit.credential.title,programs.cip_4_digit.unit_id,programs.cip_4_digit.code`
    );
    const result = response.data.results[0]["latest.programs.cip_4_digit"];
    const total =
      response.data.results[0]["latest.programs.cip_4_digit"].length;
    //console.log(response.data.results[0]["latest.programs.cip_4_digit"])
    const limit = 35;
    res.json({
      data: response.data.results[0]["latest.programs.cip_4_digit"],
      currentPage: Number(page),
      total: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: `Something went wrong ERR CODE:${e.message}` });
  }
}

export async function likeCollegeName(req, res) {
  const { id } = req.params;
  const { name, code, degreeName,zip,city,state } = req.body;
  const userId = String(req.userId);
  //console.log(req.body)

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ msg: "You need to be logged in" });
    }


    const index = user.savedSchoolData.findIndex(value => value.id === id)
    
     
    if(index === -1){
        user.savedSchoolData.push({id,name,zip,city,state})
    }else{
        user.savedSchoolData = user.savedSchoolData.filter(item => item.id !== id)
    }

    // user.savedSchoolData.push({name,degreeName,id,code})
     const updatedUser = await User.findByIdAndUpdate(userId,user,{new:true})
     res.status(200).json(updatedUser.savedSchoolData)

     //console.log(updatedUser)
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: e.message });
  }
}

export async function deleteCollege(req,res){
    const {id} = req.body;
    const userId = String(req.userId);
    console.log(req.body)
   

    try{
        const user = await User.findById(userId)

        if(user){
            user.savedSchoolData = user.savedSchoolData.filter(item => item.id !== id)
        }

        const updatedUser = await User.findByIdAndUpdate(userId,user,{new:true})
     res.status(200).json(updatedUser.savedSchoolData)

    }catch(e){
        console.log(e);
        res.status(404).json({ msg: e.message });
    }
}

export async function getSavedCollege(req,res){
  const userId = String(req.userId);

  try{
    const user = await User.findById(userId)

    if(user){
      res.status(200).json(user.savedSchoolData)
    }

  }catch(e){
    console.log(e);
    res.status(404).json({ msg: e.message });
  }
}
