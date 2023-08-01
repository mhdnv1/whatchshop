let products = document.querySelector('.product__cards')
let form = document.querySelector('form')
let modalTrigger = document.querySelectorAll('#modal'),
    modal = document.querySelector('.modal'),
    modalClose = document.querySelector('.modal__close')
console.log(modalTrigger);

modalTrigger.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        modal.classList.add('show')
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden'
    })
})
function closeMOdal(){
    modal.classList.add('hide')
    modal.classList.remove('show')
    document.body.style.overflow = ''
}
modalClose.addEventListener('click' , closeMOdal)

document.addEventListener('keydown', (e)=>{
    if (e.code === 'Escape' && modal.classList.contains('show')) {
               closeMOdal()     
    }

} )


// -----------------------------------------------------------------------
const getProducts = () => {
    fetch('http://localhost:3000/products')
        .then((res) => res.json())
        .then((res) => res.map((item) => {
            products.innerHTML += `
        <div class="product__card">
        <img src="${item.image}" alt="Airpods">
        <p class="product__card-title">${item.title}</p>
        <p class="product__card-price">${item.price}</p>
        <button class="product__btn">Buy</button>
    </div>  `
        }))
}
getProducts()

form.addEventListener('submit' , (e)=>{
    e.preventDefault()
    let producut = {
        title : e.target[0].value,
        price : e.target[1].value,
        image : e.target[2].value
    }
    fetch('http://localhost:3000/products',{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(producut)
    }).then((res)=>alert('успешно'))
    .catch((err)=>alert(err))
})