using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RestoreAPI.Data.Migrations
{
    /// <inheritdoc />
    public partial class AppCouponInsteadOfCoupon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Coupon_Id",
                table: "Carts");

            migrationBuilder.RenameColumn(
                name: "Coupon_PromotionCode",
                table: "Carts",
                newName: "AppCoupon_PromotionCode");

            migrationBuilder.RenameColumn(
                name: "Coupon_PercentOff",
                table: "Carts",
                newName: "AppCoupon_PercentOff");

            migrationBuilder.RenameColumn(
                name: "Coupon_Name",
                table: "Carts",
                newName: "AppCoupon_Name");

            migrationBuilder.RenameColumn(
                name: "Coupon_AmountOff",
                table: "Carts",
                newName: "AppCoupon_AmountOff");

            migrationBuilder.AddColumn<string>(
                name: "AppCoupon_CouponId",
                table: "Carts",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppCoupon_CouponId",
                table: "Carts");

            migrationBuilder.RenameColumn(
                name: "AppCoupon_PromotionCode",
                table: "Carts",
                newName: "Coupon_PromotionCode");

            migrationBuilder.RenameColumn(
                name: "AppCoupon_PercentOff",
                table: "Carts",
                newName: "Coupon_PercentOff");

            migrationBuilder.RenameColumn(
                name: "AppCoupon_Name",
                table: "Carts",
                newName: "Coupon_Name");

            migrationBuilder.RenameColumn(
                name: "AppCoupon_AmountOff",
                table: "Carts",
                newName: "Coupon_AmountOff");

            migrationBuilder.AddColumn<int>(
                name: "Coupon_Id",
                table: "Carts",
                type: "int",
                nullable: true);
        }
    }
}
