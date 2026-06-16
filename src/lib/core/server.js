'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);

 
  return res.json();
};

// export const serverMutation = async(path,datum)=>{
//     const res = await fetch(`${baseUrl}${path}`,{
//         method: "POST",
//         headers:{
//             'content-type': 'application/json'
//         },
//         body : JSON.stringify(datum)
//     })
//     const data = await res.json()
//     return data;
// }

export const serverMutation = async (path, datum) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(datum),
  });

  console.log("Status:", res.status);

const data = await res.json();
console.log("Response:", data);

return data;  
};