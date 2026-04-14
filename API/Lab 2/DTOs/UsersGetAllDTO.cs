namespace Lab_2.DTOs
{
    public class UsersGetAllDTO
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string StFname { get; set; }
        public string StLname { get; set; }
        public int Age { get; set; }
        public string Address { get; set; }
        public string? DeptName { get; set; }
    }
}
