namespace RestoreAPI.RequestHelpers
{
    public class PaginationParams
    {
        private const int MaxPageSize = 10;
        private int _pageSize = 8;
        public int PageNumber { get; set; } = 1;
        public int PageSize
        {
            get { return _pageSize; }
            set {
                _pageSize = value > MaxPageSize ? MaxPageSize : value;
            }
        }
    }
}
