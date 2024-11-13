(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,a){e.exports=a(37)},24:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(13),l=a.n(o),c=a(6),s=(a(24),a(2));const i={display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",backgroundColor:"#f4f4f4"},u={display:"flex",flexDirection:"column",alignItems:"center",padding:"20px",maxWidth:"400px",width:"100%",border:"1px solid #ccc",borderRadius:"8px",backgroundColor:"#fff",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"},d={fontSize:"1.5em",marginBottom:"10px",textAlign:"center"},p={display:"flex",flexDirection:"column",width:"100%"},m={marginBottom:"10px",padding:"8px",fontSize:"1em",border:"1px solid #ccc",borderRadius:"4px",outline:"none",transition:"border-color 0.3s"},g={padding:"10px",fontSize:"1em",backgroundColor:"#4CAF50",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",transition:"background-color 0.3s"},y={color:"red",marginTop:"10px",fontSize:"0.9em"},b={marginTop:"20px",padding:"8px",fontSize:"1em",backgroundColor:"#008CBA",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",transition:"background-color 0.3s"};var h=e=>{let{setActiveUser:t,users:a,setShowSection:o,showSection:l}=e;const[c,s]=Object(n.useState)(""),[h,E]=Object(n.useState)(""),[x,f]=Object(n.useState)(""),[S,w]=Object(n.useState)(""),[v,C]=Object(n.useState)("");return r.a.createElement("div",{style:i},r.a.createElement("div",{style:u},r.a.createElement("h1",{style:d},"signUp"===l?"Sign Up":"Login"," to Wings Cafe Inventory System"),"signUp"===l?r.a.createElement("form",{onSubmit:e=>{e.preventDefault();const t=JSON.parse(localStorage.getItem("users"))||[];t.some(e=>e.username===x)?C("Username already exists. Please choose another."):(t.push({username:x,password:S}),localStorage.setItem("users",JSON.stringify(t)),alert("Sign-up successful! You can now log in."),o("login"))},style:p},r.a.createElement("input",{type:"text",value:x,onChange:e=>f(e.target.value),placeholder:"New Username",required:!0,style:m}),r.a.createElement("input",{type:"password",value:S,onChange:e=>w(e.target.value),placeholder:"New Password",required:!0,style:m}),r.a.createElement("button",{type:"submit",style:g},"Sign Up"),v&&r.a.createElement("p",{style:y},v)):r.a.createElement("form",{onSubmit:e=>{e.preventDefault();const n=a.find(e=>e.username===c&&e.password===h);n?(localStorage.setItem("loggedIn","true"),localStorage.setItem("activeUser",JSON.stringify(n)),t(n),C("")):C("Invalid username or password.")},style:p},r.a.createElement("input",{type:"text",value:c,onChange:e=>s(e.target.value),placeholder:"Username",required:!0,style:m}),r.a.createElement("input",{type:"password",value:h,onChange:e=>E(e.target.value),placeholder:"Password",required:!0,style:m}),r.a.createElement("button",{type:"submit",style:g},"Login"),v&&r.a.createElement("p",{style:y},v)),r.a.createElement("button",{onClick:()=>o("login"===l?"signUp":"login"),style:b},"signUp"===l?"Already a user? Log in here":"New user? Sign Up here")))};var E=()=>{const[e,t]=Object(n.useState)([]),[a,o]=Object(n.useState)({name:"",category:"",price:"",quantity:""}),[l,c]=Object(n.useState)(null),[s,i]=Object(n.useState)(""),[u,d]=Object(n.useState)("");Object(n.useEffect)(()=>{p()},[]);const p=async()=>{try{const a=await fetch("/api/products");if(!a.ok)throw new Error("Failed to fetch products");const n=await a.json();t(n),localStorage.setItem("products",JSON.stringify(n))}catch(e){console.error(e),d("Error fetching products")}},m=async(t,a)=>{const n=parseInt(s,10);if(isNaN(n)||n<=0)return void alert("Please enter a valid quantity to add or deduct.");const r="add"===a?e[t].quantity+n:e[t].quantity-n;if(r<0)return void alert("Quantity cannot be less than 0.");const o=e[t].id;try{const a=await fetch(`/api/products/${o}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({quantity:r})});if(!a.ok)throw new Error("Failed to update quantity");const n=await a.json(),c=e.map((e,a)=>a===t?n:e);g(c),i("")}catch(l){console.error(l),d("Error updating quantity")}},g=e=>{t(e),localStorage.setItem("products",JSON.stringify(e))},y=()=>{o({name:"",category:"",price:"",quantity:""}),c(null),d("")},b={padding:"8px",margin:"10px 0",width:"100%",border:"1px solid #ccc",borderRadius:"4px"},h={padding:"5px 10px",marginRight:"5px",backgroundColor:"#f0ad4e",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"};return r.a.createElement("div",{style:{padding:"20px",maxWidth:"800px",margin:"0 auto"}},r.a.createElement("h2",{style:{textAlign:"center",marginBottom:"20px"}},null!==l?"Edit Product":"Add New Product"),u&&r.a.createElement("p",{style:{color:"red"}},u),r.a.createElement("input",{value:a.name,onChange:e=>o({...a,name:e.target.value}),placeholder:"Product Name",style:b}),r.a.createElement("input",{value:a.category,onChange:e=>o({...a,category:e.target.value}),placeholder:"Category",style:b}),r.a.createElement("input",{value:a.price,onChange:e=>o({...a,price:e.target.value}),placeholder:"Price",style:b}),r.a.createElement("input",{value:a.quantity,onChange:e=>o({...a,quantity:e.target.value}),placeholder:"Quantity",style:b}),r.a.createElement("button",{onClick:async()=>{const t={...a,quantity:parseInt(a.quantity,10)||0};try{let a;if(null!==l){const n=e[l].id;a=await fetch(`/api/products/${n}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})}else a=await fetch("/api/products",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!a.ok)throw new Error("Failed to save product");const r=await a.json(),o=null!==l?e.map((e,t)=>t===l?r:e):[...e,r];g(o),y()}catch(n){console.error(n),d("Error saving product")}},style:{padding:"10px 20px",backgroundColor:"#4CAF50",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"}},null!==l?"Update Product":"Add Product"),r.a.createElement("h3",{style:{marginTop:"30px"}},"Product List"),r.a.createElement("table",{style:{width:"100%",borderCollapse:"collapse",marginTop:"20px"}},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Name"),r.a.createElement("th",null,"Category"),r.a.createElement("th",null,"Price"),r.a.createElement("th",null,"Quantity"),r.a.createElement("th",null,"Actions"))),r.a.createElement("tbody",null,e.map((t,a)=>r.a.createElement("tr",{key:a},r.a.createElement("td",null,t.name),r.a.createElement("td",null,t.category),r.a.createElement("td",null,t.price),r.a.createElement("td",null,t.quantity),r.a.createElement("td",null,r.a.createElement("button",{onClick:()=>(t=>{const a=e[t];o({name:a.name,category:a.category,price:a.price,quantity:a.quantity.toString()}),c(t)})(a),style:h},"Edit"),r.a.createElement("button",{onClick:()=>(async t=>{const a=e[t].id;try{if(!(await fetch(`/api/products/${a}`,{method:"DELETE"})).ok)throw new Error("Failed to delete product");const r=e.filter((e,a)=>a!==t);g(r)}catch(n){console.error(n),d("Error deleting product")}})(a),style:h},"Delete"),r.a.createElement("button",{onClick:()=>m(a,"add"),style:h},"Add Quantity"),r.a.createElement("button",{onClick:()=>m(a,"deduct"),style:h},"Deduct Quantity"),r.a.createElement("input",{type:"number",value:s,onChange:e=>i(e.target.value),placeholder:"Enter qty",style:b})))))))},x=a(15),f=a(14);a(35),a(36);var S=e=>{let{activeUser:t,setShowDashboard:a}=e;const[o,l]=Object(n.useState)([]),[c,s]=Object(n.useState)(0),[i,u]=Object(n.useState)([]);Object(n.useEffect)(()=>{const e=JSON.parse(localStorage.getItem("products"))||[];l(e);const t=e.reduce((e,t)=>e+t.quantity,0);s(t);const a=e.filter(e=>e.quantity<5);u(a)},[]);const d={labels:o.map(e=>e.name),datasets:[{label:"Quantity in Stock",data:o.map(e=>e.quantity),backgroundColor:"rgba(54, 162, 235, 0.6)",borderColor:"rgba(54, 162, 235, 1)",borderWidth:1}]};return r.a.createElement("div",{style:{padding:"20px",backgroundColor:"#f4f4f4",borderRadius:"8px",maxWidth:"800px",margin:"0 auto"}},r.a.createElement("h1",{style:{color:"#333",fontSize:"24px",textAlign:"center"}},"Welcome to Wings Cafe Inventory Management, ",t),r.a.createElement("div",{style:{marginTop:"20px",padding:"15px",backgroundColor:"#fff",borderRadius:"8px",boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.1)"}},r.a.createElement("h2",{style:{color:"#333",fontSize:"20px"}},"Stock Summary"),r.a.createElement("p",null,"Total Products: ",o.length),r.a.createElement("p",null,"Total Stock Quantity: ",c),r.a.createElement("p",null,"Low Stock Products:"),r.a.createElement("ul",null,i.map((e,t)=>r.a.createElement("li",{key:t,style:{color:"red"}},e.name," - Only ",e.quantity," left")))),r.a.createElement("div",{style:{marginTop:"30px",padding:"15px",backgroundColor:"#fff",borderRadius:"8px",boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.1)"}},r.a.createElement("h2",{style:{color:"#333",fontSize:"20px",textAlign:"center"}},"Stock Quantity Chart"),r.a.createElement(x.a,{data:d,options:{responsive:!0,plugins:{legend:{display:!1},tooltip:{enabled:!0,callbacks:{label:e=>`Quantity: ${e.raw}`}}},scales:{y:{beginAtZero:!0,title:{display:!0,text:"Quantity"}},x:{title:{display:!0,text:"Product Name"}}}}})),r.a.createElement("div",{style:{marginTop:"30px",padding:"15px",backgroundColor:"#fff",borderRadius:"8px",boxShadow:"0px 0px 10px rgba(0, 0, 0, 0.1)"}},r.a.createElement("h2",{style:{color:"#333",fontSize:"20px",textAlign:"center"}},"Product Images"),r.a.createElement(f.Carousel,{showThumbs:!1,autoPlay:!0,infiniteLoop:!0},o.map((e,t)=>r.a.createElement("div",{key:t},r.a.createElement("img",{src:e.imageUrl||"https://via.placeholder.com/150",alt:e.name}),r.a.createElement("p",{className:"legend"},e.name," - Quantity: ",e.quantity))))))};var w=function(e){let{users:t,setUsers:a}=e;const[o,l]=Object(n.useState)(""),[c,s]=Object(n.useState)(""),[i,u]=Object(n.useState)(""),[d,p]=Object(n.useState)(null);Object(n.useEffect)(()=>{const e=JSON.parse(localStorage.getItem("users"))||[];a(e)},[a]);const m=()=>{l(""),s(""),u(""),p(null)},g={marginBottom:"10px",padding:"8px",width:"100%",boxSizing:"border-box",borderRadius:"4px",border:"1px solid #ccc"},y={backgroundColor:"#007bff",color:"white",padding:"10px 20px",border:"none",borderRadius:"4px",cursor:"pointer",width:"100%",marginTop:"10px"},b={backgroundColor:"#ffffff",padding:"15px",borderRadius:"8px",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)",marginBottom:"10px"},h={textAlign:"center",color:"#333"},E={display:"flex",justifyContent:"center",gap:"10px",marginTop:"10px"};return r.a.createElement("div",{style:{padding:"20px",backgroundColor:"#f4f4f4",borderRadius:"8px",boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)",width:"800px",margin:"auto"}},r.a.createElement("h2",{style:h},"User Management"),r.a.createElement("input",{value:o,onChange:e=>l(e.target.value),placeholder:"Username",style:g}),r.a.createElement("input",{value:c,onChange:e=>s(e.target.value),placeholder:"Password",style:g}),r.a.createElement("input",{value:i,onChange:e=>u(e.target.value),placeholder:"Email",style:g}),r.a.createElement("button",{onClick:()=>{const e={username:o,password:c,email:i};if(null!==d){const n=[...t];n[d]=e,a(n),localStorage.setItem("users",JSON.stringify(n))}else{const n=[...t,e];a(n),localStorage.setItem("users",JSON.stringify(n))}m()},style:y},null!==d?"Update":"Add"," User"),r.a.createElement("h3",{style:h},"User List"),0===t.length?r.a.createElement("p",{style:{textAlign:"center"}},"No users available."):r.a.createElement("ul",{style:{listStyleType:"none",paddingLeft:"0"}},t.map((e,n)=>r.a.createElement("li",{key:n,style:b},r.a.createElement("h4",null,e.username),r.a.createElement("p",null,"Email: ",e.email),r.a.createElement("div",{style:E},r.a.createElement("button",{onClick:()=>(e=>{l(t[e].username),s(t[e].password),u(t[e].email),p(e)})(n),style:{...y,backgroundColor:"#007bff",width:"auto"}},"Edit"),r.a.createElement("button",{onClick:()=>(e=>{const n=t.filter((t,a)=>a!==e);a(n),localStorage.setItem("users",JSON.stringify(n))})(n),style:{...y,backgroundColor:"#e74c3c",width:"auto"}},"Delete"))))))};const v={display:"flex",justifyContent:"center",gap:"15px",marginBottom:"20px",backgroundColor:"#f4f4f4",padding:"10px 0"},C={backgroundColor:"#4CAF50",color:"white",padding:"10px 20px",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"16px",transition:"background-color 0.3s"},k={backgroundColor:"#f44336",color:"white",padding:"10px 20px",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"16px",transition:"background-color 0.3s"};var O=function(){const[e,t]=Object(n.useState)([]),[a,o]=Object(n.useState)([]),[l,c]=Object(n.useState)(null),[i,u]=Object(n.useState)("login"),[d,p]=Object(n.useState)(!1),m=Object(s.p)(),g=async(e,t)=>{try{p(!0);const n=await fetch(e);if(!n.ok)throw new Error(`Failed to fetch ${e}`);t(await n.json())}catch(a){console.error(`Error fetching ${e}:`,a)}finally{p(!1)}};Object(n.useEffect)(()=>{g("/api/users",t),g("/api/products",o)},[]),Object(n.useEffect)(()=>{l?localStorage.setItem("activeUser",JSON.stringify(l)):localStorage.removeItem("activeUser")},[l]);const y=async()=>{try{p(!0),await fetch("/api/logout",{method:"POST"}),c(null),localStorage.removeItem("activeUser"),alert("You have been logged out."),m("/")}catch(e){console.error("Error logging out:",e)}finally{p(!1)}};return r.a.createElement("div",{className:"App"},l&&r.a.createElement("nav",{style:v},r.a.createElement("button",{onClick:()=>m("/dashboard"),style:C},"Dashboard"),r.a.createElement("button",{onClick:()=>m("/productManagement"),style:C},"Product Management"),r.a.createElement("button",{onClick:()=>m("/userManagement"),style:C},"User Management"),r.a.createElement("button",{onClick:y,style:k},"Logout")),d&&r.a.createElement("p",null,"Loading..."),r.a.createElement(s.d,null,r.a.createElement(s.b,{path:"/",element:l?r.a.createElement(s.a,{to:"/dashboard"}):r.a.createElement(h,{setActiveUser:c,users:e,setShowSection:u,showSection:i})}),r.a.createElement(s.b,{path:"/dashboard",element:l?r.a.createElement(S,{products:a}):r.a.createElement(s.a,{to:"/"})}),r.a.createElement(s.b,{path:"/productManagement",element:l?r.a.createElement(E,{setProducts:o,products:a}):r.a.createElement(s.a,{to:"/"})}),r.a.createElement(s.b,{path:"/userManagement",element:l?r.a.createElement(w,{users:e,setUsers:t}):r.a.createElement(s.a,{to:"/"})}),r.a.createElement(s.b,{path:"/logout",element:r.a.createElement("div",{onClick:y},"Logging out...")})))};var j=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,38)).then(t=>{let{getCLS:a,getFID:n,getFCP:r,getLCP:o,getTTFB:l}=t;a(e),n(e),r(e),o(e),l(e)})};l.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(c.a,null,r.a.createElement(O,null)))),j()}},[[16,1,2]]]);
//# sourceMappingURL=main.9f5f47a1.chunk.js.map