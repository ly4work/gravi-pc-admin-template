export function Logger() {
  if (arguments.length <= 0) {
    return void 0;
  }
  const logList = Array.prototype.slice.call(arguments, 0);
  const info = logList.shift();
  // console.log(`${new Date().toString()} | ${info}  =====>  `, ...logList);
  console.log(`${info}  =====>  `, ...logList);
}

// export class Logger {
//   static print = function() {
//     if (arguments.length <= 0) {
//       return void 0;
//     }
//     const logList = [...arguments];
//     const info = logList.shift();
//     console.log(`${new Date().toString()} | ${info}  =====> `, ...logList);
//   }
//   static level = {
//     warning: '%c ',
//     info: ''
//   }
//   static info = function() {
//     Logger.print('info')
//   }
//   static warning = function() {
//     Logger.print('warning')
//   }
// }
