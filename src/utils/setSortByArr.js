export const setSortByArr = (orderBy) => {
    switch(orderBy) {
        case "Name":
            return ["A to Z", "Z to A"];
        case "Release Date":
            return ["Old to New", "New to Old"];
        default:
            return ["Low to High", "High to Low"];
    }
}