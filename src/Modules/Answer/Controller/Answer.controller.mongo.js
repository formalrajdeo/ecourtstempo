// const bcrypt = require("bcryptjs");
const db = require('../../../../server/Models')

const Answer = db.answer

// Create and Save a new Role
exports.create = (req, res) => {
  const case_details = {
    caseType: req.body.caseType,
    filingNumber: req.body.filingNumber,
    registrationNumber: req.body.registrationNumber,
    cnrNumber: req.body.cnrNumber,
    filingdata: req.body.filingdata,
    registrationDate: req.body.registrationDate,
  }
  const case_status = {
    firstHearingDate: req.body.firstHearingDate,
    nextHearingDate: req.body.nextHearingDate,
    caseStage: req.body.caseStage,
    courtNumberAndJudge: req.body.courtNumberAndJudge,
  }
  const petitioner = [
    {
      name: req.body.name,
    },
  ]
  const petitioner_advocate = [
    {
      name: req.body.name,
    },
  ]
  const respondent = [
    {
      name: req.body.name,
    },
  ]
  const respondent_advocate = [
    {
      name: req.body.name,
    },
  ]
  const laws = [
    {
      type: req.body.type,
      sectionNo: req.body.sectionNo,
      name: req.body.name,
    },
  ]

  const business = [
    {
      courtName: req.body.courtName,
      inTheCourtOf: req.body.inTheCourtOf,
      crnNumber: req.body.crnNumber,
      caseNumber: req.body.caseNumber,
      petitioner: req.body.petitioner,
      respondent: req.body.respondent,
      date: req.body.date,
      businessIn: req.body.businessIn,
      nextPurpose: req.body.nextPurpose,
      nextHearingDate: req.body.nextHearingDate,
    },
  ]
  const hearings = [
    {
      date: req.body.date,
      nextdate: req.body.nextdate,
      purpose: req.body.purpose,
      judge: req.body.judge,
      business: req.body.business,
    },
  ]
  const orders = [
    {
      orderDate: req.body.orderDate,
      type: req.body.type,
      orderDetailsPdfPath: req.body.orderDetailsPdfPath,
      orderNo: req.body.orderNo,
    },
  ]
  // ====================================== Response ======================================
  const responseDataCheerio = {
    uuid: req.body.uuid,
    case_details: req.body.case_details,
    case_status: req.body.case_status,
    petitioner: req.body.petitioner,
    petitioner_advocate: req.body.petitioner_advocate,
    respondent: req.body.respondent,
    respondent_advocate: req.body.respondent_advocate,
    laws: req.body.laws,
    hearings: req.body.hearings,
    orders: req.body.orders,
  }
  // Create a Answer
  const answer = {
    captcha_img: req.body.captcha_img,
    responseDataCheerio: req.body.responseDataCheerio,
  }
  let answerModel = new Answer(answer)
  // Save Role in the database
  answerModel
    .save()
    .then((doc) => {
      // console.log(doc);
      res.send({
        success: true,
        results: doc,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred while creating the Role.',
      })
    })
}

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
  const name = req.query.name
  var condition = name ? { name: `/${name}/` } : null
  Answer.find(condition)
    .then((doc) => {
      console.log(doc)
      res.send({
        success: true,
        results: doc,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred while creating the Role.',
      })
    })
}

// Find a single Role with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Answer.findOne({ _id: id })
    .then((doc) => {
      console.log(doc)
      res.send({
        success: true,
        results: doc,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred while retrieving roles.',
      })
    })
}

// Update a Role by the id in the request
exports.update = (req, res) => {
  const id = req.params.id

  Answer.updateOne({ _id: id }, req.body)
    .then((doc) => {
      console.log(doc)
      Answer.findOne({ _id: id })
        .then((role) => {
          console.log(role)
          res.send({
            success: true,
            results: doc,
            role,
          })
        })
        .catch((err) => {
          console.error(err)
        })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        success: false,
        message:
          err.message ||
          `Cannot update Role with id = ${id}. Maybe Role was not found or req.body is empty!`,
      })
    })
}

// Delete a Role with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id
  Answer.deleteOne({ _id: id })
    .then((doc) => {
      console.log(doc)
      res.send({
        success: true,
        results: doc,
        message: `Role with id = ${id} has been deleted successfully!`,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({
        success: false,
        message:
          err.message ||
          `Cannot delete Role with id = ${id}. Maybe Role was not found !`,
      })
    })
}

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
  Answer.deleteMany()
    .then((nums) => {
      res.send({
        success: true,
        results: nums,
        message: `${nums.deletedCount} Roles were deleted successfully!`,
      })
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred while removing all roles.',
      })
    })
}
