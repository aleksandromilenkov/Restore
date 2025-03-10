using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestoreAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class CorrectingOrderDateTimeProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OrderData",
                table: "Orders",
                newName: "OrderDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OrderDate",
                table: "Orders",
                newName: "OrderData");
        }
    }
}
