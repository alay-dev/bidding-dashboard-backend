const catchAsync = require("../utils/catchAsync");
const axios = require("axios");

exports.get_token = catchAsync(async (req, res, next) => {
  let data = await axios.post(
    `https://www.upwork.com/api/v3/oauth2/token?code=${req.body.code}&grant_type=authorization_code&client_id=a80c416b3496b5de682f9b8315771669&redirect_uri=http://localhost:3000/auth/callback&client_secret=54f3cd0fd5043a91`
  );

  data = data.data;

  console.log("aaa", data);
  if (data) {
    res.status(200).json({
      status: "success",
      data,
    });
  } else {
    console.log(token);
  }

  next();
});

exports.get_jobs = catchAsync(async (req, res, next) => {
  let data = await axios.get(
    `https://www.upwork.com/api/profiles/v2/search/jobs.json?q=${req.body.query}&paging=${req.body.page};${req.body.page_size}`,
    {
      headers: {
        Authorization: `Bearer ${req.body.token}`,
      },
    }
  );

  data = data.data;
  let filtered_data = [];

  if (req.body.filter) {
    let filters = req.body.filter.toLowerCase();
    filters = filters.split(",");

    data.jobs.map((row) => {
      if (filters.indexOf(row.client.country.toLowerCase()) === -1) {
        filtered_data.push(row);
      }
    });
  } else {
    data.jobs.map((row) => {
      filtered_data.push(row);
    });
  }

  res.status(200).json({
    status: "success",
    data: filtered_data,
  });

  next();
});

// const filterData = (data, filter, res) => {
//   let filters = filter.toLowerCase();
//   filters = filters.replace(" ", "");
//   filters = filters.split(",");

//   console.log(filters);
//   let filtered_data = [];

//   data.jobs.map((row) => {
//     if (filters.indexOf(row.client.country.toLowerCase()) === -1) {
//       console.log(row.client.country.toLowerCase());
//       filtered_data.push(row);
//     }
//   });

//   console.log(filtered_data.length);

//   res.status(200).json({
//     status: "success",
//     data: filtered_data,
//   });
// };
