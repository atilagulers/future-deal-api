const express = require('express');
const router = express.Router();
const {tryCatch} = require('../utils');
const User = require('../models/User');
const Claim = require('../models/Claim');
const {StatusCodes} = require('http-status-codes');

//GET /user/:userId

router.get(
  '/:userId/claims',
  tryCatch(async (req, res) => {
    const userId = req.params.userId;
    const claims = await Claim.find({'claimCreator.user': userId});

    res.status(StatusCodes.OK).json({
      success: true,
      data: claims,
    });
  })
);

//GET /user/:userId/claims

router.get(
  '/:userId',
  tryCatch(async (req, res) => {
    const userId = req.params.userId;
    const data = await User.findById(userId);

    res.status(StatusCodes.OK).json({
      success: true,
      data,
    });
  })
);

//POST /user/create

router.post(
  '/create',
  tryCatch(async (req, res) => {
    const data = await User.create(req.body);

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      data,
    });
  })
);

module.exports = router;
