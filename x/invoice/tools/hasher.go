package tools

import (
	"crypto/rand"
	"golang.org/x/crypto/sha3"
)

func GenHash(items []string) ([]byte, error) {
	h := sha3.New256()
	for _, el := range items {
		_, err := h.Write([]byte(el))
		if err != nil {
			return nil, err
		}
	}
	return h.Sum(nil), nil
}

func GenRandomBytes(n int) ([]byte, error) {
	b := make([]byte, n)
	nr, err := rand.Read(b)
	if err != nil || nr != n {
		return nil, err
	}
	return b, nil
}
