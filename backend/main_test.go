package main

import (
	"strings"
	"testing"
	"time"
)

func TestVisitorConfirmationHTML(t *testing.T) {
	out := buildVisitorConfirmationHTML("Mario <script>", "Ciao\n100%", "info@davide-ferraro.it")
	if strings.Contains(out, "%!") {
		t.Fatalf("template contains fmt corruption: %s", out)
	}
	if !strings.Contains(out, "width: 100%;") {
		t.Fatal("CSS percentage was not preserved")
	}
	if !strings.Contains(out, "Mario &lt;script&gt;") {
		t.Fatal("name was not HTML-escaped")
	}
	if !strings.Contains(out, "Ciao<br/>100%") {
		t.Fatal("message was not escaped/formatted correctly")
	}
}

func TestOwnerNotificationHTML(t *testing.T) {
	out := buildOwnerNotificationHTML("Mario", "mario@example.com", "Ciao\n100%", "13/11/2026 10:00:00 CET")
	if strings.Contains(out, "%!") {
		t.Fatalf("template contains fmt corruption: %s", out)
	}
	if !strings.Contains(out, "mailto:mario@example.com?subject=Re:%20Contatto%20dal%20portfolio") {
		t.Fatal("mailto link was not preserved")
	}
	if !strings.Contains(out, "Ciao<br/>100%") {
		t.Fatal("message was not escaped/formatted correctly")
	}
}

func TestValidateContactRequest(t *testing.T) {
	valid := ContactRequest{Name: "Mario", Email: "mario@example.com", Message: "Ciao"}
	if err := validateContactRequest(&valid); err != nil {
		t.Fatalf("valid request rejected: %v", err)
	}

	injected := ContactRequest{Name: "Mario\r\nBcc: evil@example.com", Email: "mario@example.com", Message: "Ciao"}
	if err := validateContactRequest(&injected); err == nil {
		t.Fatal("header injection was not rejected")
	}

	tooLong := ContactRequest{Name: "Mario", Email: "mario@example.com", Message: strings.Repeat("a", 5001)}
	if err := validateContactRequest(&tooLong); err == nil {
		t.Fatal("oversized message was not rejected")
	}
}

func TestRateLimiter(t *testing.T) {
	rl := &RateLimiter{limits: make(map[string][]time.Time), maxHits: 3, window: 10 * time.Minute}
	for i := 0; i < 3; i++ {
		if !rl.Allow("1.2.3.4") {
			t.Fatalf("request %d unexpectedly rejected", i+1)
		}
	}
	if rl.Allow("1.2.3.4") {
		t.Fatal("fourth request should be rate limited")
	}
	if !rl.Allow("5.6.7.8") {
		t.Fatal("different IP should not be rate limited")
	}
}
