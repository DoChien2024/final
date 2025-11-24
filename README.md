<!-- Typescript -->
# 1.The basics
string: "Chien", number: 10; boolean:true, false,
array: number[chỉ số] or array<number>
tuple: số lg và ptu cố định, [string, number]
any: tôi ko qtam (nên ít sd bỏ qua vc check kiểu)
unknown: check type narrowing. An toàn hơn any
void: hàm ko trả về gtri(function log(message: string): void {...})
# 2.Type Inference
let name= "Win" <!--tư hiểu là string-->
name = 100 <!--error-->
# 3.Function Types
Có tính năng mạnh.Định nghĩa parameters và return value
function greet{name: string, age: number}: string{ <!--trả về 1 string-->
    return `Hello ${name}, you are ${age} years old.`;
}
# 4.Interface và Type Alias
2 cách chính định nghĩa shapes cho object
<!-- Type Alias: dùng các kiểu phức tạp như Union or Intersection -->
type User= {
    id: number;
    username: string;
    isActive: boolean;
};
function getUser(user: User): string {
    return user.username;
}
<!-- Interface: đ/n shapes cảu object or class, có thể extends or merging -->
interface Product {
    id: string;
    name: string;
    price: number;
    description?: string; <!--thuộc tính ko bắt buộc-->
};
const laptop: Product ={
    id= "p1",
    name: "Lenovo",
    price: 2000
};
<!--=================Intermediate========================== -->
Kiểu giúp code của bạn linh hoạt và mạnh mẽ hơn.
# 1.Union Types: cho phép 1 biến có thể là 1 trong nhiều kiểu. Sd: |
function printID(id: string | number) {
    console.log(`ID: ${id}`);
}
printID(101); printID("202-A") <!--'id' là string or number-->
# 2.Intersection Types: hợp nhiều thành 1. SD: &
type Employee= {
    employeeID: string;
};
type Person= {
    name: string;
};
<!-- manager là 1 person và là 1 employee -->
type Manager = Person & Employee;
const boss: Manager ={
    name: "win",
    employeeID: "E111"
};
# 3.Generics: cho phép bạn viết 1 hàm or class có thể hd vs nhiều data type khác
function getFirstElement<C>(arr: C[]): C {
    return arr[0];
}
let numbers =[1,2,3];
let firstNum = getFirstElement(numbers); <!--biết firstNum = numbers -->
let strings =[ "a", "b", "c"];
let firstString = getFirstElement(strings);<!--biết firstString= strings-->
# 4.Enums: tạo nhóm các hàng có số tên
enum UserRole {
    ADMIN,EDITOR,GUEST
}
function checkPermission(role: UserRole) {
    if (role === UserRole.ADMIN) {
        console.log('Full access');
    }
}
checkPermission(UserRole.ADMIN);
<!--==========Real-World===============-->

# Final
