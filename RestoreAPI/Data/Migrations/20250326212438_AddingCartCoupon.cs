using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestoreAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddingCartCoupon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Coupon_AmountOff",
                table: "Carts",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Coupon_Id",
                table: "Carts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Coupon_Name",
                table: "Carts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Coupon_PercentOff",
                table: "Carts",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Coupon_PromotionCode",
                table: "Carts",
                type: "int",
                precision: 5,
                scale: 2,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Coupon_AmountOff",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "Coupon_Id",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "Coupon_Name",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "Coupon_PercentOff",
                table: "Carts");

            migrationBuilder.DropColumn(
                name: "Coupon_PromotionCode",
                table: "Carts");
        }
    }
}
