// 'use strict';

// const _       = require('lodash');
// const assert  = require('power-assert');
// const Megumi = require('../');

// const DATA_LENGTH   = 100;
// const TASK_ERROR_MESSAGE = 'task_failure';
// const PARAMETER_IS_INVALID_ERROR_MESSAGE = 'params is invalid';

// describe('Megumi Abnormal', () => {
//   beforeEach( (done) => {
//     this.dataList = Array.from(Array(DATA_LENGTH).keys()); // [0..99];
//     this.task_failure = a => {
//       return new Promise( (resolve, reject) => {
//         throw new Error(TASK_ERROR_MESSAGE);
//       });
//     };
//     done();
//   });

//   it('should return Promise.reject when is thrown new Error()', (done) => {
//     const params = {
//       skip: 0,
//       limit: 20,
//       dataList: this.dataList,
//       task: this.task_failure,
//     };
//     const Megumi = new Megumi(params);
//     Megumi.bite()
//     .then( result => {
//       assert(false);
//       done();
//     })
//     .catch( err => {
//       assert(err.message === TASK_ERROR_MESSAGE);
//       assert(_.isError(err));
//       done();
//     });
//   });

//   // it('should return Promise.reject when dont pass constructor argument', (done) => {
//   //   const Megumi = new Megumi();
//   //   Megumi.bite()
//   //   .then( result => {
//   //     assert(false);
//   //     done();
//   //   })
//   //   .catch( err => {
//   //     assert(err.message === PARAMETER_IS_INVALID_ERROR_MESSAGE);
//   //     assert(_.isError(err));
//   //     done();
//   //   });
//   // });

// });
