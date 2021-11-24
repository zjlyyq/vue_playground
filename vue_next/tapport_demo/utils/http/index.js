export function post(url, data) {
  return new Promise((resolve, reject) =>{
    const xhr = new XMLHttpRequest();
    xhr.open("post", url);
    xhr.onreadystatechange = () => {
      if (xhr.status === 200) {
        const gifURL = xhr.responseText;
        resolve(gifURL);
      } else {
        const errorText2 = JSON.parse(xhr.responseText).errorText.split("\n")[0];
        reject(errorText2);
      }
    };
    xhr.send(data);
  });
}