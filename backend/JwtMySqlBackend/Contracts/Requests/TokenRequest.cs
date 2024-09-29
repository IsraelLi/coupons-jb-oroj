using System.Text.Json.Serialization;

namespace JwtMySqlBackend.Contracts.Requests;

public record TokenRequest(
    [field: JsonPropertyName("email")] string Email,
    [field: JsonPropertyName("password")] string Password,
    [field: JsonPropertyName("type")] string Type);