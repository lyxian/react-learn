// import imagePizza from './pizza.jpg';

export const products = [
    { title: "Burgs", category: "Mains", image: "https://ik.imagekit.io/jq1luxum6oz/https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/Moby6cfef8.jpg?tr=,h-1000", description: "Toasted brioche bun, crispy battered full-sized fillet of Haddock, cheddar cheese, tartare sauce, sweet chilli and lettuce.", price: 25 },
    { title: "Pizza", category: "Mains", image: require("./pizza.jpg").default, description: "NA", price: 1 },
    { title: "Pasta", category: "Mains", image: "https://ik.imagekit.io/jq1luxum6oz/https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/TruffleMushroomLinguinee47d0c.jpg?tr=w-250,h-250", description: "Sauteed mix mushrooms, porcini cream sauce, white truffle oil, parmesan shavings, De Checco linguine.", price: 26 },
    { title: "Wagyu", category: "Mains", image: "https://ik.imagekit.io/jq1luxum6oz/https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/USDAAngusBeefShortRib69fc47_1645880982672.jpg?tr=,h-1000", description: "24 hour slow-cooked tender beef short ribs, flame grilled and finished off with our 'naughty' glaze. Served with side salad.", price: 50 },
    { title: "Fries", category: "Sides", image: "https://ik.imagekit.io/jq1luxum6oz/https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/TruffleFriesMaximus358243.jpg?tr=w-250,h-250", description: "Thick cut fries, sautéed mushrooms with thyme, white truffle oil,  parmesan cheese, truffle mayo.", price: 19, },
    { title: "Chick", category: "Sides", image: "https://ik.imagekit.io/jq1luxum6oz/https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/BuffaloWings7b0d58.jpg?tr=w-250,h-250", description: "Crispy chicken wings coated with sweet, spicy, and tangy buffalo sauce. Comes with ranch dip.", price: 9 },
    { title: "Salad", category: "Sides", image: "https://ik.imagekit.io/jq1luxum6oz/https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/product/GarlicButterSummerVegetables60318e.jpg?tr=w-250,h-250", description: "Sauteed mix of cauliflowers, carrots and long peas.", price: 8 },
    { title: "Mojito", category: "Beverage", image: "https://eatbook.sg/wp-content/uploads/2021/06/korean-home-cafe-drink-recipes-galaxy-mojito.jpg", description: "NA", price: 1 },
    { title: "Coffee", category: "Beverage", image: require("./coffee.jpg").default, description: "NA", price: 1 },
];

export const categories = {
    Mains: "Delicious grilled meats and burgers sent to your doorstep! Free Islandwide Delivery for all orders $60 and above.",
    Sides: "Delicious Sides",
    Beverage: "Delicious Beverage",
}