document.addEventListener("DOMContentLoaded", () => {
  const url = 'http://localhost:3000/api/v1/products';
  const fileFormDOM = document.querySelector('.productForm');
  const titleInputDOM = document.querySelector('#title');
  const descriptionInputDOM = document.querySelector('#description');
  const priceInputDOM = document.querySelector('#price');
  const stockInputDOM = document.querySelector('#stock');
  const imageInputDOM = document.querySelector('#image');
  const submitButton = document.querySelector('.btn');
  let imageValue;

  const messageDiv = document.getElementById('messageDiv');

  const uploadImageLocal = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    try {
      const response = await axios.post(`${url}/uploads/local`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.image.src;
    } catch (error) {
      console.log(error);
      throw new Error('Local Image upload failed');
    }
  };

  const uploadImage = async (imageFile) => {
    // 
    const formData = new FormData();
    formData.append('image', imageFile);
    try {
      const response = await axios.post(`${url}/uploads`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.image.src;
    } catch (error) {
      console.log(error);
      throw new Error('Image upload failed');
    }
  };

  fileFormDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitButton.disabled = true;

    const titleValue = titleInputDOM.value;
    const descriptionValue = descriptionInputDOM.value;
    const stockValue = stockInputDOM.value;
    const priceValue = priceInputDOM.value;

    if (!titleValue || !descriptionValue || isNaN(priceValue) || isNaN(stockValue)) {
      messageDiv.style.display = 'block';
      messageDiv.innerText = 'Please fill in all fields with valid data.';
      submitButton.disabled = false;
      return;
    }

    try {
      const imageFile = imageInputDOM.files[0];

      const localImageUrl = await uploadImageLocal(imageFile);
      const onlineImageUrl = await uploadImage(imageFile);

      const product = {
        title: titleValue,
        description: descriptionValue,
        stock: stockValue,
        price: priceValue,
        image: onlineImageUrl,
        localImage: localImageUrl
      };

      await axios.post(url, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      messageDiv.style.display = 'block';
      messageDiv.innerText = `Product Uploaded`;

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      messageDiv.style.display = 'block';
      messageDiv.innerText = 'Error uploading product. Please try again later.';
      console.log(error);
    } finally {
      submitButton.disabled = false;
    }
  });
});
///uploads-local