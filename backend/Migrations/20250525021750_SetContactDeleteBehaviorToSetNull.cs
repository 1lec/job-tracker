using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SetContactDeleteBehaviorToSetNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Contacts_ContactId",
                table: "Jobs");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Contacts_ContactId",
                table: "Jobs",
                column: "ContactId",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Contacts_ContactId",
                table: "Jobs");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Contacts_ContactId",
                table: "Jobs",
                column: "ContactId",
                principalTable: "Contacts",
                principalColumn: "Id");
        }
    }
}
