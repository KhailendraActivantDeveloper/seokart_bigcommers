// (function () {
//   const w = window;
//   const ic = w.Intercom;
//   if (typeof ic === 'function') {
//     ic('reattach_activator');
//     ic('update', w.intercomSettings);
//   } else {
//     const d = document;
//     const i = function () {
//       i.c(arguments);
//     };
//     i.q = [];
//     i.c = function (args) {
//       i.q.push(args);
//     };
//     w.Intercom = i;
//     const l = function () {
//       const s = d.createElement('script');
//       s.type = 'text/javascript';
//       s.async = true;
//       s.src = 'https://widget.intercom.io/widget/zd1gh4in';
//       const x = d.getElementsByTagName('script')[0];
//       x.parentNode.insertBefore(s, x);
//     };
//     if (document.readyState === 'complete') {
//       l();
//     } else if (w.attachEvent) {
//       w.attachEvent('onload', l);
//     } else {
//       w.addEventListener('load', l, false);
//     }
//   }
// })();



//   window.Intercom("boot", {
//     api_base: "https://api-iam.intercom.io",
//     app_id: "zd1gh4in"
//   });

//   window.intercomSettings = {
//     user_id: localStorage.getItem('user_id'),
//     app_id: "zd1gh4in"
//   }



var sample_user_properties = {
	'First name': 'Sllhailendra',
	'Email': 'Skkhailendraprasad@example.com',
	// "fs_contact" : true,
};

fwcrm.identify('khailendraprasad@example.com', sample_user_properties);