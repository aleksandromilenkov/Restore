namespace RestoreAPI.RequestHelpers
{
    public class ProductsQueryObject
    {
        public string? OrderBy { get; set; }
        public string? SearchTerm { get; set; }
        public string? Brands { get; set; }
        public string? Types { get; set; }
    }
}
